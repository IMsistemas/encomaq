<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
	protected $table = "biz_item";

    protected $primaryKey = "iditem";


    public function biz_Referralguideitem()
    {
        return $this->hasMany('App\Models\Biz\Referralguideitem',"iditem");
    }
    public function biz_itemprice()
    {
        return $this->hasMany('App\Models\Biz\ItemPrice',"iditem");
    }
    public function nom_category()
    {
        return $this->belongsTo('App\Models\Nomenclature\CategoryItem',"idcategoryitem");
    }
    public function nom_unit()
    {
        return $this->belongsTo('App\Models\Nomenclature\UnitType',"idunittype");
    }
    public function biz_price()
    {
        return $this->hasMany('App\Models\Biz\ItemPrice',"iditem");
    }
}
