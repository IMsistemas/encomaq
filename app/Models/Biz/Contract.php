<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
	protected $table = "biz_contract";

    protected $primaryKey = "idcontract";

    public function biz_referralguide()
    {
        return $this->hasMany('App\Models\Biz\Referralguide',"idcontract");
    }
    public function biz_client()
    {
        return $this->belongsTo('App\Models\Biz\Client',"idclient");
    } 
    public function biz_contractitem()
    {
        return $this->hasMany('App\Models\Biz\ContractItem',"idcontract");
    }   
}
