<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Carrier extends Model
{
	protected $table = 'biz_carrier';

    protected $primaryKey = 'idcarrier';

    public function nom_identifytype()
    {
        return $this->belongsTo('App\Models\Nomenclature\IndetifyType','ididentifytype');
    }
   
}
