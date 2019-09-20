<?php
namespace App\Validators;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\Message;

class BaseValidator
{
    protected $rule = [];
    protected $message = [];

    public function check($params=[])
    {
        if (empty($params)) {
            $params = Request::except('_method');
        }
        $validate = Validator::make($params, $this->rule($params), $this->message);
        if ($validate->fails()) {
            throw new Message(['msg'=>$validate->errors()]);
        }
        return true;
    }
}
