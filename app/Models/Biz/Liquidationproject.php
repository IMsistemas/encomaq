<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class Liquidationproject extends Model
{
    protected $table = 'biz_liquidation_project';

    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;
    public function biz_liquidation()
    {
        return $this->belongsTo('App\Models\Biz\Liquidation', 'idliquidation');
    }
    public function biz_project()
    {
        return $this->belongsTo('App\Models\Biz\Project', 'idproject');
    }
}
