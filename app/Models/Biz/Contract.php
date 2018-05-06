<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
	protected $table = "biz_contract";

    protected $primaryKey = "idcontract";

    public function biz_Referralguide()
    {
        return $this->hasMany('App\Models\Biz\Referralguide',"idcontract");
    }    
}
