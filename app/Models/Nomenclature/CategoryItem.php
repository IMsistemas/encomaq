<?php

namespace App\Models\Nomenclature;

use Illuminate\Database\Eloquent\Model;

class CategoryItem extends Model
{
	protected $table = "nom_categoryitem";

    protected $primaryKey = "idcategoryitem";

   

    public function biz_Item()
    {
        return $this->hasMany('App\Models\Biz\Item',"idcategoryitem");
    }
}
