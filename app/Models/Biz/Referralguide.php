<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Referralguide extends Model
{
	protected $table = "biz_referralguide";

    protected $primaryKey = "idreferralguide";

   

    public function biz_Referralguideitem()
    {
        return $this->hasMany('App\Models\Biz\Referralguideitem',"idreferralguide");
    }
}
