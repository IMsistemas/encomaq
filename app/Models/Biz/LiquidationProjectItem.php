<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class LiquidationProjectItem extends Model
{
    protected $table = 'biz_liquidationprojectitem';
    protected $primaryKey = 'idliquidationprojectitem';
    
    public function biz_project()
    {
        return $this->belongsTo('App\Models\Biz\Project', 'idproject');
    }
    public function biz_item()
    {
        return $this->belongsTo('App\Models\Biz\Item', 'iditem');
    }
}
