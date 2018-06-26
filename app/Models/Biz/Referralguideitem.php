<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Referralguideitem extends Model
{
	protected $table = "biz_referralguideitem";

    protected $primaryKey = "idreferralguideitem";
    
    public function biz_item()
    {
        return $this->belongsTo('App\Models\Biz\Item','iditem');
    }
}
