<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Liquidation extends Model
{
    protected $table = 'biz_liquidation';
    protected $primaryKey = 'idliquidation';
    
    public function biz_referralguideliquidation()
    {
        return $this->hasMany('App\Models\Biz\Referralguideliquidation','idliquidation');
    }


}
