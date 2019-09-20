<?php

namespace App\Traits;
use Illuminate\Support\Facades\Request;

trait Curd
{
    public function index()
    {
        if(Request::Ajax()){
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();
            $model = new \App\Models\Example;
            $lists = $model->where($where)->count();
            dd($lists);
            return 'ajax';
        }
        // $data = [
        //     ['name'=>'', 'email'=>'@163.com'],
        //     ['name'=>'sail', 'email'=>'@qq.com'],
        //     ['name'=>'hhh', 'email'=>'gamil.com']
        // ];
        $data = ['id'=>1, 'name'=>'ss', 'email'=>'zs@q.com'];
        $this->validator->check($data);

        
        return view('backend.pages.'.$this->controller.'.index');
    }

    public function create()
    {
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
    public function toggle($id, $param){
        $arr = explode('=', $param);
        if ($arr) {
            $v = $arr[1] == 1 ? 0 : 1;
            $this->model->where('id', $id)->update([$arr[0]=>$v]);
        }
        $this->success('操作成功');
    }
}
