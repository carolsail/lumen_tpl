<?php

namespace App\Exceptions;

class Message extends BaseException
{
    public $code = 400;
    public $errorCode = 0;
    public $msg = 'error';
}
