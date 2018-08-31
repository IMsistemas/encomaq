<?php

namespace App\Models\Nomenclature;

use Illuminate\Database\Eloquent\Model;

class TypeTransferReason extends Model
{
    protected $table = 'nom_typetransferreason';

    protected $primaryKey = 'idtypetransferreason';

    public function nom_transferreason()
    {
        return $this->hasMany('App\Models\Nomenclature\TransferReason','idtypetransferreason');
    }
}
