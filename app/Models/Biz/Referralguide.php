<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Referralguide extends Model
{
	protected $table = 'biz_referralguide';

    protected $primaryKey = 'idreferralguide';

    public function biz_Referralguideitem()
    {
        return $this->hasMany('App\Models\Biz\Referralguideitem','idreferralguide');
    }

    public function biz_contract()
    {
        return $this->belongsTo('App\Models\Biz\Contract', 'idcontract');
    }

    public function biz_carrier()
    {
        return $this->belongsTo('App\Models\Biz\Carrier', 'idcarrier');
    }

    public function nom_transferreason()
    {
        return $this->belongsTo('App\Models\Biz\Carrier', 'idtransferreason');
    }
}
