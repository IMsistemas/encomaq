<?php

namespace App\Models\Biz;

use Illuminate\Database\Eloquent\Model;

class PaymentForm extends Model
{
    protected $table = 'biz_paymentform';

    protected $primaryKey = 'idpaymentform';

    public function biz_contract_paymentform()
    {
        return $this->hasMany('App\Models\Biz\ContractPaymentForm',"idpaymentform");
    }
}
