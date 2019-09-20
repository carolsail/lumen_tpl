<?php

namespace App\Http\Controllers\Backend;

use Laravel\Lumen\Routing\Controller;
use Illuminate\Support\Facades\Request;
use App\Traits\Curd;

class BaseController extends Controller
{
    use Curd;
    public $controller, $action;

    public function __construct(){
        list($controller, $action) = explode('@', substr(strrchr(Request::route()[1]['uses'], '\\'), 1));
        $this->controller = strtolower($controller);
        $this->action = strtolower($action);
        /**
         *  配置js使用的些许变量
         *  controller: 当前控制器名称
         *  action: 当前方法名
         *  module: 模块名
         *  base_url: 入口路径
         *  upload: 上传相关配置
         */
        $config = [
            'controller' => $this->controller,
            'action' => $this->action,
            'module' => explode('/', Request::path())[0],
            'base_url' => url(),
            'base_path' => base_path(),
            'upload' => config('upload')
        ];

        view()->share(['config'=>$config, 'hasNavbar'=>true]);
    }
    
    /** 
     * 前端boostrap-table.js转sql查询
     */
    protected function buildparams($autoSql = true)
    {
        $filter = Request::input('filter');
        $op = trim(Request::input('op', ''));
        $sort = Request::input('sort', 'id');
        $order = Request::input('order', 'desc');
        $offset = Request::input('offset', 0);
        $limit = Request::input('limit', 0);

        $filter = (array)json_decode($filter, true);
        $op = (array)json_decode($op, true);
        $filter = $filter ? $filter : [];
        $where = [];
        foreach ($filter as $k => $v) {
            $sym = isset($op[$k]) ? $op[$k] : '=';
            $v = !is_array($v) ? trim($v) : $v;
            $sym = strtoupper(isset($op[$k]) ? $op[$k] : $sym);
            switch ($sym) {
                case '=':
                case '!=':
                    $where[] = [$k, $sym, (string)$v];
                    break;
                case 'LIKE':
                case 'NOT LIKE':
                case 'LIKE %...%':
                case 'NOT LIKE %...%':
                    $where[] = [$k, trim(str_replace('%...%', '', $sym)), "%{$v}%"];
                    break;
                case '>':
                case '>=':
                case '<':
                case '<=':
                    $where[] = [$k, $sym, intval($v)];
                    break;
                case 'FINDIN':
                case 'FINDINSET':
                case 'FIND_IN_SET':
                    $where[] = "FIND_IN_SET('{$v}', " . ($relationSearch ? $k : '`' . str_replace('.', '`.`', $k) . '`') . ")";
                    break;
                case 'IN':
                case 'IN(...)':
                case 'NOT IN':
                case 'NOT IN(...)':
                    $where[] = [$k, str_replace('(...)', '', $sym), is_array($v) ? $v : explode(',', $v)];
                    break;
                case 'BETWEEN':
                case 'NOT BETWEEN':
                    $arr = array_slice(explode(',', $v), 0, 2);
                    if (stripos($v, ',') === false || !array_filter($arr)) {
                        continue;
                    }
                    //当出现一边为空时改变操作符
                    if ($arr[0] === '') {
                        $sym = $sym == 'BETWEEN' ? '<=' : '>';
                        $arr = $arr[1];
                    } elseif ($arr[1] === '') {
                        $sym = $sym == 'BETWEEN' ? '>=' : '<';
                        $arr = $arr[0];
                    }
                    $where[] = [$k, $sym, $arr];
                    break;
                case 'RANGE':
                case 'NOT RANGE':
                    $v = str_replace(' - ', ',', $v);
                    $arr = array_slice(explode(',', $v), 0, 2);
                    if (stripos($v, ',') === false || !array_filter($arr)) {
                        continue;
                    }
                    //当出现一边为空时改变操作符
                    if ($arr[0] === '') {
                        $sym = $sym == 'RANGE' ? '<=' : '>';
                        $arr = $arr[1];
                    } elseif ($arr[1] === '') {
                        $sym = $sym == 'RANGE' ? '>=' : '<';
                        $arr = $arr[0];
                    }
                    $where[] = [$k, str_replace('RANGE', 'BETWEEN', $sym) . ' time', $arr];
                    break;
                case 'NULL':
                case 'IS NULL':
                case 'NOT NULL':
                case 'IS NOT NULL':
                    $where[] = [$k, strtolower(str_replace('IS ', '', $sym))];
                    break;
                default:
                    break;
            }
        }
        
        if ($autoSql) {
            $where = function ($query) use ($where) {
                foreach ($where as $k => $v) {
                    if (is_array($v)) {
                        call_user_func_array([$query, 'where'], $v);
                    } else {
                        $query->where($v);
                    }
                }
            };
        }
        return [$where, $sort, $order, $offset, $limit];
    }
}
