<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $table = 'sys_user';

    protected $primaryKey = 'iduser';

    public function role()
    {
        return $this->belongsTo('App\Models\System\Role', 'idrole');
    }

}
