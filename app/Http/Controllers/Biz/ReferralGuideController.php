<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Referralguide;
use App\Models\Biz\Referralguideitem;
use App\Models\Biz\ReferralGuidePlace;
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

        $result = Referralguide::with('biz_contract.biz_client.biz_Project', 'biz_carrier.nom_identifytype', 'nom_transferreason', 'biz_Referralguideitem.biz_item.biz_price', 'biz_referralguide_place.biz_place_start', 'biz_referralguide_place.biz_place_end')
            ->selectRaw("biz_referralguide.* ")
            ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
            ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" );

        if (isset($filter->idliquidation) == false) {
            $where = " biz_referralguide.state ='" . $filter->state."' ";
            $where .= " AND (sequential LIKE '%" . $filter->search . "%' ";
            $where .= " OR biz_contract.nocontract LIKE '%" . $filter->search . "%' ";
            $where .= " OR biz_client.businessname LIKE '%" . $filter->search . "%'  ) ";

            if (isset($filter->client)) {
                $where .= " AND  biz_client.idclient=".$filter->client." ";
            }

            if (isset($filter->dateinit) == true && isset($filter->dateend) == true) {
                if ($filter->dateinit != '' && $filter->dateend != '') {
                    $where .= " AND  biz_referralguide.datetimereferral BETWEEN '" . $filter->dateinit . "' AND '" . $filter->dateend . "' ";
                }
            }

            if (isset($filter->idprojects) == true && count($filter->idprojects) > 0) {
                $where .= ' AND ';
                for ($i = 0; $i < count($filter->idprojects); $i++) {
                    if ($i == 0) {
                        $where .= '( biz_referralguide.idproject = ' . $filter->idprojects[$i];
                    } else {
                        $where .= ' OR biz_referralguide.idproject = ' . $filter->idprojects[$i];
                    }
                }
                $where .= ') ';
            }

            $result = $result->whereRaw($where)->orderBy($filter->column, $filter->order)
                                ->paginate($filter->num_page);

        } else {
            $where = 'biz_referralguide_liquidation.idliquidation = ' . $filter->idliquidation;

            $result = $result->join("biz_referralguide_liquidation", "biz_referralguide_liquidation.idreferralguide", "=", "biz_referralguide.idreferralguide" )
                                ->whereRaw($where)
                                ->get();
        }

        return $result;

        /*return Referralguide::with('biz_contract.biz_client.biz_Project', 'biz_carrier.nom_identifytype', 'nom_transferreason', 'biz_Referralguideitem.biz_item.biz_price', 'biz_referralguide_place.biz_place_start', 'biz_referralguide_place.biz_place_end')
                                ->selectRaw("biz_referralguide.* ")
                                ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                                ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                                ->whereRaw($where)->orderBy($filter->column, $filter->order)
                                ->paginate($filter->num_page);*/
    }

    public function listclient_referralguide()
    {
        $where = " biz_referralguide.state ='1' ";
        return Referralguide::selectRaw("biz_client.* ")
                                ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                                ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                                ->whereRaw($where)
                                ->orderBy("biz_client.businessname", "ASC")
                                ->groupBy("biz_client.idclient")
                                ->get();
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

    private function searchNumber($number, $id = null)
    {

        if ($id == null) {

            $count = Referralguide::where('guidenumber', $number)->count();

        } else {

            $count = Referralguide::where('guidenumber', $number)->where('idreferralguide', '!=', $id)->count();

        }

        return ($count > 0) ? true : false;

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

        if ($this->searchNumber($data["Data"]["guidenumber"]) == false) {

            $aux = new Referralguide();
            $aux->idcontract = $data["Data"]["idcontract"];
            $aux->idproject = $data["Data"]["idproject"];
            $aux->idtransferreason = $data["Data"]["idtransferreason"];
            $aux->idcarrier = $data["Data"]["idcarrier"];
            $aux->datetimereferral = $data["Data"]["datetimereferral"];
            $aux->sequential = $data["Data"]["sequential"];
            /*$aux->startingpoint = $data["Data"]["startingpoint"];
            $aux->arrivalpoint = $data["Data"]["arrivalpoint"];*/
            $aux->guidenumber = $data["Data"]["guidenumber"];
            $aux->logisticservicecost = $data["Data"]["logisticservicecost"];
            $aux->state = 1;
            if ($aux->save()) {

                $place = new ReferralGuidePlace();

                $place->idreferralguide = $aux->idreferralguide;
                $place->idplace_start = $data["Data"]["idplace_start"];
                $place->idplace_end = $data["Data"]["idplace_end"];

                if ($place->save() == false) {
                    return response()->json(['error' => $aux]);
                }

                foreach ($data["list"] as $f) {
                    if( $f["iditem"]!="" ) {
                        $caux = new Referralguideitem();
                        $caux->idreferralguide = $aux->idreferralguide;
                        $caux->iditem = $f["iditem"];
                        $caux->price = $f["price"];
                        $caux->quantify = $f["quantity"];
                        $caux->observation = $f["observation"];
                        $caux->save();
                    }
                }
                return response()->json(['success' => $aux ]);
            } else {
                return response()->json(['error' => $aux]);
            }

        } else {

            return response()->json(['error' => 'number_exists']);

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

        if ($this->searchNumber($data["guidenumber"], $id) == false) {

            $aux =  Referralguide::find($id);
            $aux->idcontract = $data["idcontract"];
            // $aux->idproject = $data["idproject"];
            $aux->idtransferreason = $data["idtransferreason"];
            $aux->idcarrier = $data["idcarrier"];
            $aux->datetimereferral = $data["datetimereferral"];
            $aux->sequential = $data["sequential"];
            /*$aux->startingpoint = $data["startingpoint"];
            $aux->arrivalpoint = $data["arrivalpoint"];*/
            // $aux->guidenumber = $data["Data"]["guidenumber"];
            $aux->guidenumber = $data["guidenumber"];
            // $aux->logisticservicecost = $data["Data"]["logisticservicecost"];
            $aux->logisticservicecost = $data["logisticservicecost"];

            //$aux->state = 1;
            if ($aux->save()) {

                ReferralGuidePlace::where('idreferralguide', $id)->delete();
                $place = new ReferralGuidePlace();
                $place->idreferralguide = $aux->idreferralguide;
                $place->idplace_start = $data["biz_referralguide_place"][0]['biz_place_start']["idplace"];
                $place->idplace_end = $data["biz_referralguide_place"][0]['biz_place_end']["idplace"];

                if ($place->save() == false) {
                    return response()->json(['error' => $aux]);
                }

                $temp = Referralguideitem::whereRaw("idreferralguide='".$id."'")->delete();

                foreach ($data["biz__referralguideitem"] as $f) {
                    if( $f["iditem"]!="" ) {
                        $caux = new Referralguideitem();
                        $caux->idreferralguide = $aux->idreferralguide;
                        $caux->iditem = $f["iditem"];
                        $caux->price = $f["price"];
                        $caux->quantify = $f["quantify"];
                        $caux->observation = $f["observation"];
                        $caux->save();
                    }
                }
                return response()->json(['success' => $aux ]);
            } else {
                return response()->json(['error' => $aux]);
            }

        } else {

            return response()->json(['error' => 'number_exists']);

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
        $where .= " AND (sequential LIKE '%" . $filter->search . "%' ";
        $where .= " OR biz_contract.nocontract LIKE '%" . $filter->search . "%'   ";
        $where .= " OR biz_client.businessname LIKE '%" . $filter->search . "%'  ) ";

        $data = Referralguide::with('biz_contract.biz_client.biz_Project', 'biz_carrier', 'nom_transferreason', 'biz_Referralguideitem')
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
    
    public function exportarpdfid ($id) {
        ini_set('max_execution_time', 300);
        
       
        $where = " biz_referralguide.state ='1' ";
        $where .= " AND biz_referralguide.idreferralguide=".$id." ";
        

        $data = Referralguide::with('biz_contract.biz_client.biz_Project', 'biz_carrier', 'nom_transferreason', 'biz_Referralguideitem')
                        ->selectRaw("biz_referralguide.* ")
                        ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                        ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                        ->whereRaw($where)
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.Guia', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream("GuiaRemision".$today.".pdf");
    }

}
