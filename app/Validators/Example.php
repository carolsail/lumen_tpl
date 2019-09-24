<?php
namespace App\Validators;

class Example extends BaseValidator
{

    //[['product_id'=>1, 'count'=>3],['product_id'=>2, 'count'=>1],...]
    // protected function rule(){
    //     return [
    //         '*.product_id' => 'required|number|filled',
    //         '*.count' => 'required|number|filled',
    //     ];
    // }

    protected function rule($params)
    {
        $arr = [
            'name' => 'required|filled',
            'email' => 'required|email|filled|unique:users,email,'.$params['id']
        ];
        return $arr;
    }

    protected $message = [
        'email.email' => '邮箱有误'
    ];
}
