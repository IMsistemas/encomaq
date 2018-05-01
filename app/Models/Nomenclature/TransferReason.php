<?php

namespace App\Models\Nomenclature;

use Illuminate\Database\Eloquent\Model;

class TransferReason extends Model
{
	protected $table = "nom_transferreason";

    protected $primaryKey = "idtransferreason";

   

    public function biz_referralguide()
    {
        return $this->hasMany('App\Models\Biz\Referralguide',"idtransferreason");
    }
}
