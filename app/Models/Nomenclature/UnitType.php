<?php

namespace App\Models\Nomenclature;

use Illuminate\Database\Eloquent\Model;

class UnitType extends Model
{
    protected $table = "nom_unittype";

    protected $primaryKey = "idunittype";

   

    public function biz_item()
    {
        return $this->hasMany('App\Models\Biz\Item',"idunittype");
    }
}
