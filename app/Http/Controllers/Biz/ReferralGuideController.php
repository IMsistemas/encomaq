<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Referralguide;
use App\Models\Biz\Referralguideitem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Company;



class ReferralGuideController extends Controller
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

    public function get(Request $request)
    {
        $filter = json_decode($request->get('filter'));

        $where = " biz_referralguide.state ='" . $filter->state."' ";
        $where .= " AND (sequential LIKE '%" . $filter->search . "%' OR purchaseproof LIKE '%" . $filter->search . "%'  ";
        $where .= " OR biz_contract.nocontract LIKE '%" . $filter->search . "%'   ";
        $where .= " OR biz_client.businessname LIKE '%" . $filter->search . "%'  ) ";
        

        return Referralguide::with('biz_contract.biz_client', 'biz_carrier', 'nom_transferreason', 'biz_Referralguideitem.biz_item')
                                ->selectRaw("biz_referralguide.* ")
                                ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                                ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                                ->whereRaw($where)->orderBy($filter->column, $filter->order)
                                ->paginate($filter->num_page);
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
        $data = $request->all();

        $aux = new Referralguide();
        $aux->idcontract = $data["Data"]["idcontract"];
        $aux->idtransferreason = $data["Data"]["idtransferreason"];
        $aux->idcarrier = $data["Data"]["idcarrier"];
        $aux->datetimereferral = $data["Data"]["datetimereferral"];
        $aux->sequential = $data["Data"]["sequential"];
        $aux->startingpoint = $data["Data"]["startingpoint"];
        $aux->arrivalpoint = $data["Data"]["arrivalpoint"];
        $aux->state = 1;
         if ($aux->save()) {
             foreach ($data["list"] as $f) {
                 if( $f["iditem"]!="" ) {
                    $caux = new Referralguideitem();
                    $caux->idreferralguide = $aux->idreferralguide;
                    $caux->iditem = $f["iditem"];
                    $caux->quantify = $f["quantity"];
                    $caux->observation = $f["observation"];
                    $caux->save();
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
        $data = $request->all();
        
        $aux =  Referralguide::find($id);;
        $aux->idcontract = $data["idcontract"];
        $aux->idtransferreason = $data["idtransferreason"];
        $aux->idcarrier = $data["idcarrier"];
        $aux->datetimereferral = $data["datetimereferral"];
        $aux->sequential = $data["sequential"];
        $aux->startingpoint = $data["startingpoint"];
        $aux->arrivalpoint = $data["arrivalpoint"];
        $aux->state = 1;
         if ($aux->save()) {
             $temp = Referralguideitem::whereRaw("idreferralguide='".$id."'")->delete();

             foreach ($data["biz__referralguideitem"] as $f) {
                 if( $f["iditem"]!="" ) {
                    $caux = new Referralguideitem();
                    $caux->idreferralguide = $aux->idreferralguide;
                    $caux->iditem = $f["iditem"];
                    $caux->quantify = $f["quantify"];
                    $caux->observation = $f["observation"];
                    $caux->save();
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
        $aux = Referralguide::find($id); 
        if ($aux->delete()) {
            return response()->json(['success' => true ]);
        } else {
            return response()->json(['error' => 'error' ]);
        }
    }

    public function updateState($id)
    {
        $aux = Referralguide::find($id);
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
        $filter = json_decode($paramentro);
       
        $where = " biz_referralguide.state ='" . $filter->state."' ";
        $where .= " AND (sequential LIKE '%" . $filter->search . "%' OR purchaseproof LIKE '%" . $filter->search . "%'  ";
        $where .= " OR biz_contract.nocontract LIKE '%" . $filter->search . "%'   ";
        $where .= " OR biz_client.businessname LIKE '%" . $filter->search . "%'  ) ";

        $data = Referralguide::with('biz_contract.biz_client', 'biz_carrier', 'nom_transferreason', 'biz_Referralguideitem')
                        ->selectRaw("biz_referralguide.* ")
                        ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                        ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                        ->whereRaw($where)->orderBy($filter->column, $filter->order)
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListGuia', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream("ListaDeGuias".$today.".pdf");
    }     

}
