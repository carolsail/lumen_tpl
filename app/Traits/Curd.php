<?php

namespace App\Traits;

use App\Exceptions\Message;
use Illuminate\Support\Facades\Request;

trait Curd
{
    private function isExtend($fun='index'){
        $flag = false;
        if (isset($this->repository)) {
            $flag = method_exists($this->repository, $fun) ? true : false;
        }
        return $flag;
    }

    public function index()
    {
        if (Request::Ajax()) {
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $total = $this->model->where($where)->count();
            $rows = $this->model->where($where)->orderBy($sort, $order)->offset($offset)->limit($limit)->get();
            if($this->isExtend('index')){
                $rows = $this->repository->index('ajax', $rows);
            }
            return ['total'=>$total, 'rows'=>$rows];
        }

        $row = [];
        if($this->isExtend('index')){
            $row['extend'] = $this->repository->index('assign');
        }
        return view('backend.pages.'.strtolower($this->controller_name).'.index', $row);
    }

    public function create()
    {
        if (Request::Ajax()){
            dd(Request::getContent());
            return 123;
        }
        $data = ['id'=>1, 'name'=>'ss', 'email'=>'zs@q.com'];
        $this->validator->check($data);

        return view('backend.pages.'.strtolower($this->controller_name).'.create');
    }

    public function update()
    {
    }

    public function delete()
    {
    }

    /**
     * 切换开关
     * $param
     */
    public function toggle($id, $param)
    {
        $arr = explode('=', $param);
        if ($arr) {
            $v = $arr[1] == 1 ? 0 : 1;
            $this->model->where('id', $id)->update([$arr[0]=>$v]);
        }
        $this->success('操作成功');
    }
}
