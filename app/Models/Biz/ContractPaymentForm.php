<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class ContractPaymentForm extends Model
{
    protected $table = 'biz_contract_paymentform';

    protected $primaryKey = 'idcontract_paymentform';

    public function biz_paymentform()
    {
        return $this->belongsTo('App\Models\Biz\PaymentForm',"idpaymentform");
    }
}
