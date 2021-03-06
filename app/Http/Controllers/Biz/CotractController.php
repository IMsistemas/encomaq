<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\ContractPaymentForm;
use App\Models\Biz\PaymentForm;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Contract;
use App\Models\Biz\ContractItem;
use App\Models\Biz\Referralguide;
use App\Models\Biz\Company;

class CotractController extends Controller
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function getContractActive()
    {
        return Contract::where('state', 1)->orderBy('nocontract', 'asc')->get();
    }

    public function getPFByContract($id) {
        return PaymentForm::with(['biz_contract_paymentform' => function($query) use ($id) {
            $query->where('idcontract', $id);
        } ])->get();
    }

    public function getLastNoContract()
    {
        $fila = Contract::all();
        $last = $fila->last();
        $num_contract = 0;
        if(  isset($last->nocontract) ) {
            $num_contract = $last->nocontract;
        }
        return response()->json(['nocontract' => str_pad((((int) $num_contract) + 1 ),9,"0", STR_PAD_LEFT ) ]);
    }

    private function verifyNoContract($nocontract, $id = 0)
    {
        $search = str_pad((((int) $nocontract) ),9,'0', STR_PAD_LEFT );

        if ($id === 0) {

            $result = Contract::where('nocontract', $search)->count();

        } else {
            $result = Contract::where('nocontract', $search)->where('idcontract', '!=', $id)->count();
        }

        if ($result == 0) {
            return $search;
        } else {
            $fila = Contract::all();
            $last = $fila->last();
            $num_contract = 0;
            if(  isset($last->nocontract) ) {
                $num_contract = $last->nocontract;
            }
            return str_pad((((int) $num_contract) + 1 ),9,'0', STR_PAD_LEFT );
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fila = Contract::all();
        $last = $fila->last();
        $data = $request->all();

         $aux = new Contract();
         $aux->idclient = $data["Data"]["idclient"];
         /*$num_contract = 0;
         if(  isset($last->nocontract) ) {
             $num_contract = $last->nocontract;
         }*/
         $aux->nocontract = $this->verifyNoContract($data["Data"]["nocontract"]);
         $aux->startdate = $data["Data"]["startdate"];
         $aux->enddate = $data["Data"]["enddate"];
         $aux->area = $data["Data"]["area"];
         $aux->idperiod = $data["Data"]["idperiod"];
         $aux->period = $data["Data"]["period"];
         $aux->cost = $data["Data"]["cost"];
         //$aux->guarantee = $data["Data"]["guarantee"];
         $aux->observation = $data["Data"]["observation"];
         $aux->receipt = $data["Data"]["receipt"];
         $aux->invoice = $data["Data"]["invoice"];
         $aux->idcategoryitem = $data["Data"]["idcategoryitem"];
         $aux->state = 1;
         if ($aux->save()) {
             foreach ($data["list"] as $f) {
                 if( $f["iditem"]!="" ) {
                    $caux = new ContractItem();
                    $caux->idcontract = $aux->idcontract;
                    $caux->iditem = $f["iditem"];
                    $caux->quantity = $f["quantity"];
                    $caux->observation = $f["observation"];
                    $caux->save();
                 }
             }

             foreach ($data["paymentform"] as $f) {
                 $caux = new ContractPaymentForm();
                 $caux->idcontract = $aux->idcontract;
                 $caux->idpaymentform = $f["idpaymentform"];

                 if ($f["valor"] != null && $f["valor"] != '') {
                    $caux->cost = $f["valor"];
                } else {
                    $caux->cost = 0;
                }

                 if ($caux->save() == false) {
                     return response()->json(['error' => false ]);
                 }
             }

            return response()->json(['success' => $aux ]);
         } else {
             return response()->json(['error' => $aux]);
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
        $fulldata = $request->all();
        return $fulldata;
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
        $data = $request->all();
        $aux =  Contract::find($id);
        $aux->idclient = $data["Data"]["idclient"];
        $aux->nocontract = $this->verifyNoContract($data["Data"]["nocontract"], $id);
        $aux->startdate = $data["Data"]["startdate"];
        $aux->enddate = $data["Data"]["enddate"];
        $aux->area = $data["Data"]["area"];
        $aux->idperiod = $data["Data"]["idperiod"];
        $aux->period = $data["Data"]["period"];
        $aux->cost = $data["Data"]["cost"];
        // $aux->guarantee = $data["Data"]["guarantee"];
        $aux->observation = $data["Data"]["observation"];
        $aux->receipt = $data["Data"]["receipt"];
        $aux->invoice = $data["Data"]["invoice"];
        $aux->idcategoryitem = $data["Data"]["idcategoryitem"];
        //$aux->state = 1;
        if ($aux->save()) {
            $temp = ContractItem::whereRaw("idcontract='".$id."'")->delete();
             foreach ($data["Data"]["biz_contractitem"] as $f) {
                 if( $f["iditem"]!="" ) {
                    $caux = new ContractItem();
                    $caux->idcontract = $id;
                    $caux->iditem = $f["iditem"];
                    $caux->quantity = $f["quantity"];
                    $caux->observation = $f["observation"];
                    $caux->save();
                 }
             }

            ContractPaymentForm::where('idcontract', $id)->delete();
            foreach ($data["paymentform"] as $f) {
                $caux = new ContractPaymentForm();
                $caux->idcontract = $id;
                $caux->idpaymentform = $f["idpaymentform"];

                if ($f["valor"] != null && $f["valor"] != '') {
                    $caux->cost = $f["valor"];
                } else {
                    $caux->cost = 0;
                }

                if ($caux->save() == false) {
                    return response()->json(['error' => false ]);
                }
            }

            return response()->json(['success' => $aux ]);
         } else {
             return response()->json(['error' => $aux]);
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
        $aux1 = Referralguide::whereRaw("idcontract=".$id."")->get();
        if (count($aux1) == 0) {
            $temp = ContractItem::whereRaw("idcontract='".$id."'")->delete();
            $aux = Contract::find($id); 
            if ($aux->delete()) {
                return response()->json(['success' => true ]);
            } else {
                return response()->json(['error' => 'error' ]);
            }
        }else {
            return response()->json(['error' => 'used' ]);
        }
    }
    public function contractfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));

        //$sql = "biz_contract.state='".$filtro->state."' AND ";
        $sql = "( biz_contract.nocontract LIKE '%".$filtro->Buscar."%' OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%') ) ";


        $data = Contract::with("biz_client.biz_project","biz_contractitem.biz_item", 'biz_period', 'biz_contractpaymentform.biz_paymentform', 'nom_categoryitem')
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient");

        if ($filtro->state != 2) {

            $sql .= "AND biz_contract.state='".$filtro->state."' AND biz_contract.enddate >= '" . date('Y-m-d') . "'";

        } else {

            $sql .= "AND biz_contract.enddate < '" . date('Y-m-d') . "'";

        }

        return  $data->whereRaw($sql)->orderBy("".$filtro->column, "".$filtro->order)->paginate($filtro->num_page);
    }

    public function resumenContract(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));
        $data = Contract::with("biz_client.biz_project","biz_contractitem.biz_item", 'biz_period', 'biz_contractpaymentform.biz_paymentform', 'nom_categoryitem')
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient")
                        ->orderBy('biz_contract.startdate', 'asc');

        return  $data->get();
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function statecontract($id)
    {
        $aux = Contract::find($id);
        if ($aux->state == 1) {
            $aux->state = 0;
        } else {
            $aux->state = 1;
        }
        if($aux->save()){
            return response()->json(['success' => $aux ]);
        }else{
            return response()->json(['error' => $aux ]);
        }
    }
    public function exportarpdf ($paramentro) {
        ini_set('max_execution_time', 300);
        $filtro = json_decode($paramentro);
       
       $data = Contract::with("biz_client","biz_contractitem", 'nom_categoryitem')
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient")
                        // ->whereRaw("biz_contract.state='".$filtro->state."' AND ( biz_contract.nocontract LIKE '%".$filtro->Buscar."%' OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%') )")
                        ->whereRaw("( biz_contract.nocontract LIKE '%".$filtro->Buscar."%' OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%') )")
                        ->orderBy("".$filtro->column, "".$filtro->order)
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListContract', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("ListaDeContratos".$today.".pdf");
    }   

    public function exportarpdfid ($id) {
        ini_set('max_execution_time', 300);
       
       $data = Contract::with("biz_client","biz_contractitem.biz_item", 'nom_categoryitem', 'biz_period')
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient")
                        ->whereRaw("biz_contract.state='1' AND biz_contract.idcontract=".$id."")
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.Contrato', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream("ListaDeContratos".$today.".pdf");
    }                    
}
