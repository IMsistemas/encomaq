<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class ReferralGuidePlace extends Model
{
    protected $table = 'biz_referralguide_place';

    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    public function biz_place_start()
    {
        return $this->belongsTo('App\Models\Biz\Place','idplace_start');
    }

    public function biz_place_end()
    {
        return $this->belongsTo('App\Models\Biz\Place','idplace_end');
    }
}
