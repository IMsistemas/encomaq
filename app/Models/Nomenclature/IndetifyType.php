<?php

namespace App\Models\Nomenclature;

use Illuminate\Database\Eloquent\Model;

class IndetifyType extends Model
{
	protected $table = "nom_identifytype";

    protected $primaryKey = "ididentifytype";

    public $incrementing = true;

    public $timestamps = false;

    public function biz_client()
    {
        return $this->hasMany('App\Models\Biz\Empresa',"ididentifytype");
    }
    public function biz_carrier()
    {
        return $this->hasMany('App\Models\Biz\Carrier',"ididentifytype");
    }
}
