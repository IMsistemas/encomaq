<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
	protected $table = "biz_client";

    protected $primaryKey = "idclient";

   

    public function biz_Project()
    {
        return $this->hasMany('App\Models\Biz\Project',"idclient");
    }
    public function biz_Contract()
    {
        return $this->hasMany('App\Models\Biz\Contract',"idclient");
    }
}
