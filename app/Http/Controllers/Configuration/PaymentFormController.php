<?php

namespace App\Http\Controllers\Configuration;

use App\Models\Biz\ContractPaymentForm;
use App\Models\Biz\PaymentForm;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentFormController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function get()
    {
        return PaymentForm::where('state', 1)->get();
    }

    public function getList()
    {
        return PaymentForm::orderBy('paymentformname', 'asc')->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $object = new PaymentForm();

        $object->paymentformname = $request->input('paymentformname');
        $object->state = 1;

        if ($object->save()) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $object = PaymentForm::find($id);

        $object->paymentformname = $request->input('paymentformname');

        if ($object->save()) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $object_relations = ContractPaymentForm::where('idpaymentform', $id)->count();

        if ($object_relations == 0) {

            ContractPaymentForm::where('idpaymentform', $id)->delete();

            $object_paymentform = PaymentForm::find($id);

            if ($object_paymentform->delete()) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false]);
            }

        } else {
            return response()->json(['success' => false, 'relations' => true]);
        }
    }
}
