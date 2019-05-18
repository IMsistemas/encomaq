<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class LiquidationItemSurplus extends Model
{
    protected $table = 'biz_liquidationitemsurplus';

    protected $primaryKey = 'idliquidationitemsurplus';

    public function biz_project()
    {
        return $this->belongsTo('App\Models\Biz\Project', 'idproject');
    }

    public function biz_item()
    {
        return $this->belongsTo('App\Models\Biz\Item','iditem');
    }
}
