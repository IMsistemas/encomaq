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
}
