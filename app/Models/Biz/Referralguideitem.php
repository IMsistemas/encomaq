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

    public function biz_itemprice()
    {
        return $this->belongsTo('App\Models\Biz\ItemPrice','iditemprice');
    }
}
