<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class RolePermission extends Model
{
    protected $table = 'sys_role_permission';

    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    public function sys_permission()
    {
        return $this->belongsTo('App\Models\System\Permission',"idpermission");
    }
}
