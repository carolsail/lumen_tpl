<?php
namespace App\Validators;

class IdMustBeInteger extends BaseValidator {

    protected function rule($params){
        return [
            'id' => 'required|integer|filled'
        ];
    }

    protected $message = [
        'id.required' => '沒有傳遞id參數',
        'id.integer' => 'id必須為整數',
        'id.filled' => 'id不能爲空值'
    ];
}