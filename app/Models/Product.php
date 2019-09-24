<?php

namespace App\Models;

class Product extends BaseModel
{
    public function skus(){
        return $this->hasMany('App\Models\ProductSku');
    }
}
