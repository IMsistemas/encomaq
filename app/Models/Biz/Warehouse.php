<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
	protected $table = "biz_warehouse";

    protected $primaryKey = "idwarehouse";

   

    public function biz_Company()
    {
        return $this->hasMany('App\Models\Biz\Company',"idwarehouse");
    }
}
