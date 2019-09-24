<?php

namespace App\Models;

class ProductSku extends BaseModel
{
    public function product(){
        return $this->belongsTo('App\Models\Product');
    }
}
