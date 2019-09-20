<?php

namespace App\Http\Controllers\Backend;
use App\Validators\Example as ExampleValidator;

class Example extends BaseController
{
    protected $validator; //验证
    
    public function __construct(ExampleValidator $validator)
    {
        parent::__construct();
        $this->validator = $validator;
    }

}
