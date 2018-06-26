<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Referralguideliquidation extends Model
{
    protected $table = 'biz_referralguide_liquidation';

    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    public function biz_referralguide()
    {
        return $this->belongsTo('App\Models\Biz\Referralguide', 'idreferralguide');
    }
}
