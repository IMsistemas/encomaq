<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Referralguide;
use App\Models\Biz\Referralguideitem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;




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

        $where = "(sequential LIKE '%" . $filter->search . "%' OR purchaseproof LIKE '%" . $filter->search . "%' ) ";
        $where .= "AND biz_referralguide.state = " . $filter->state;

        /*if ($filter->idcontract != '') {
            $where .= ' AND idcontract = ' . $filter->idcontract;
        }

        if ($filter->idtransferreason != '') {
            $where .= ' AND idtransferreason = ' . $filter->idtransferreason;
        }

        if ($filter->idcarrier != '') {
            $where .= ' AND idcarrier = ' . $filter->idcarrier;
        }*/

        return Referralguide::with('biz_contract.biz_client', 'biz_carrier', 'nom_transferreason', 'biz_Referralguideitem')
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

    public function updateState(Request $request, $id)
    {
        $guide = Referralguide::find($id);

        if($request->input('state') == 1){

            $guide->state = 0;

        } else {

            $guide->state = 1;

        }

        if ($guide->save()) {

            return response()->json(['success' => true ]);

        } else {

            return response()->json(['success' => false ]);

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
        //
    }
}
