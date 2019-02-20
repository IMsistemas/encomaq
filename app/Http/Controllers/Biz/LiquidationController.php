<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\LiquidationItemSurplus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Liquidation;
use App\Models\Biz\Referralguideliquidation;
use App\Models\Biz\Liquidationproject;
use App\Models\Biz\Company;
use App\Models\Biz\LiquidationProjectItem;


class LiquidationController extends Controller
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

    public function getLogo()
    {
        return Company::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fila = Liquidation::all();
        $last = $fila->last();
        $data = $request->all();

         $aux = new Liquidation();
         
         $num_contract = 0;
         if(  isset($last->number) ) {
             $num_contract = $last->number;
         }
         $aux->number = str_pad((((int) $num_contract) + 1 ),9,"0", STR_PAD_LEFT );
         $aux->dateinit = $data["Data"]["dateinit"];
         $aux->dateend = $data["Data"]["dateend"];
         $aux->observation = $data["Data"]["observation"];
         $aux->subtotal = $data["Subtotal"];
         $aux->iva = $data["Iva"];
         $aux->total = $data["Total"];
         //$aux->projects = json_encode($data["Data"]["projects"]);
         $aux->state = 1;
         if ($aux->save()) {
             foreach ($data["list"] as $f) {
                 $real =  new Referralguideliquidation();
                 $real->idliquidation = $aux->idliquidation;
                 $real->idreferralguide = $f["idreferralguide"];
                 $real->save();
             }
             foreach ($data["Data"]["projects"] as $f) {
                 $lqpr =  new Liquidationproject;
                 $lqpr->idliquidation = $aux->idliquidation;
                 $lqpr->idproject = $f;
                 $lqpr->save();
             }
             foreach ($data["enObraObject"] as $f) {
                 $o =  new LiquidationItemSurplus();
                 $o->idliquidation = $aux->idliquidation;
                 $o->iditem = $f['iditem'];
                 $o->iditemprice = $f['iditemprice'];
                 $o->quantify = $f['quantify'];
                 $o->price = $f['price'];
                 $o->save();
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

        $aux = Liquidation::find($id);

         $aux->number = $data["Data"]["number"];
         $aux->billnumber = $data["Data"]["billnumber"];
         $aux->dateinit = $data["Data"]["dateinit"];
         $aux->dateend = $data["Data"]["dateend"];
         $aux->observation = $data["Data"]["observation"];
         $aux->subtotal = $data["Data"]["subtotal"];
         $aux->iva = $data["Data"]["iva"];
         $aux->total = $data["Data"]["total"];
         $aux->state = 1;
         if ($aux->save()) {

             Referralguideliquidation::whereRaw("idliquidation=".$aux->idliquidation."")->delete();
             Liquidationproject::whereRaw("idliquidation=".$aux->idliquidation."")->delete();
             LiquidationItemSurplus::whereRaw("idliquidation=".$aux->idliquidation."")->delete();

             /*foreach ($data["Data"]["biz_referralguideliquidation"] as $f) {
                 $real =  new Referralguideliquidation();
                 $real->idliquidation = $aux->idliquidation;
                 $real->idreferralguide = $f["idreferralguide"];
                 $real->save();
             }*/
             foreach ($data["listGuide"] as $f) {
                 $real =  new Referralguideliquidation();
                 $real->idliquidation = $aux->idliquidation;
                 $real->idreferralguide = $f["idreferralguide"];
                 $real->save();
             }
             foreach ($data["list"]["projects"] as $f) {
                 $lqpr =  new Liquidationproject;
                 $lqpr->idliquidation = $aux->idliquidation;
                 $lqpr->idproject = $f;
                 $lqpr->save();
             }
             foreach ($data["enObraObject"] as $f) {
                 $o =  new LiquidationItemSurplus();
                 $o->idliquidation = $aux->idliquidation;
                 $o->iditem = $f['iditem'];
                 $o->iditemprice = $f['iditemprice'];
                 $o->quantify = $f['quantify'];
                 $o->price = $f['price'];
                 $o->save();
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
        $aux1 = Referralguideliquidation::whereRaw("idliquidation=".$id."")->delete();
        $aux2 = Liquidationproject::whereRaw("idliquidation=".$id."")->delete();
        $aux = Liquidation::find($id); 
        if ($aux->delete()) {
            return response()->json(['success' => true ]);
        } else {
            return response()->json(['error' => 'error' ]);
        }
    }

    public function searchSobrante(Request $request)
    {
        $filtro = json_decode($request->get('filter'));

        if (isset($filtro->idliquidation) == true) {

            $liquidation = Liquidation::find($filtro->idliquidation);

            $month = (int)(explode('-', $liquidation->dateinit)[1]);

        } else {

            $month = (int)(explode('-', $filtro->dateinit)[1]);
        }

        if ($month == 12) {
            $month = 1;
        } else {
            $month = $month - 1;
        }

        return LiquidationItemSurplus::with('biz_item')
            ->join('biz_liquidation', 'biz_liquidation.idliquidation', '=', 'biz_liquidationitemsurplus.idliquidation')
            ->selectRaw('biz_liquidationitemsurplus.*')->whereRaw('MONTH(biz_liquidation.dateinit) = ' . $month)->get();


    }

    public function liquidationfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));

        $sql ="";
        if ($filtro->Buscar!='') {
            $sql .=" OR biz_liquidation.idliquidation IN (";
            $sql .=" SELECT biz_liquidation_project.idliquidation FROM biz_liquidation_project WHERE biz_liquidation_project.idproject IN ( ";
            $sql .=" SELECT biz_project.idproject FROM biz_project  WHERE biz_project.idclient IN (";
            $sql .=" SELECT biz_client.idclient FROM biz_client  WHERE  businessname LIKE '%".$filtro->Buscar."%') ";
            $sql .=" )";
            $sql .=")";
        }
        $data = Liquidation::with("biz_liquidationproject.biz_project.biz_client",
                                            "biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client",
                                            "biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item",
                                            "biz_referralguideliquidation.biz_referralguide.nom_transferreason"
                        )
                        ->whereRaw("biz_liquidation.state='".$filtro->state."' AND ( biz_liquidation.number LIKE '%".$filtro->Buscar."%' ".$sql." )")
                        ->orderBy("".$filtro->column, "".$filtro->order);

        return  $data->paginate($filtro->num_page);
    }
    public function stateliquidation($id)
    {
        $aux = Liquidation::find($id);
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
       
       $data = Liquidation::with("biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client",
                                            "biz_liquidationproject.biz_project",
                                            "biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item")
                        ->whereRaw("biz_liquidation.state='".$filtro->state."' AND ( biz_liquidation.number LIKE '%".$filtro->Buscar."%'  )")
                        ->orderBy("".$filtro->column, "".$filtro->order)
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListLiquidation', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("ListaDeLiquidaciones".$today.".pdf");
    } 
    
    public function exportarpdfid ($id) {
        ini_set('max_execution_time', 300);
       
       $data = Liquidation::with("biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client","biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item")
                        ->whereRaw("biz_liquidation.state='1' AND  biz_liquidation.idliquidation=".$id."")
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.Liquidacion', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream("ListaDeLiquidaciones".$today.".pdf");
    } 

    public function createPDF (Request $request)
    {

        $body = $request->input('body');
        $name = $request->input('id') . '.txt';

        file_put_contents(public_path() . '/uploads/temp/' . $name, $body );

        return response()->json(['success' => true, 'filename' => $name]);

    }

    public function exportPDF ($paramentro)
    {
        ini_set('max_execution_time', 300);
        $filtro = json_decode($paramentro);

        $company = Company::all();

        $body = file_get_contents(public_path() . '/uploads/temp/' . $filtro->name);

        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.LiquidacionFormat', compact('body','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');

        unlink(public_path() . '/uploads/temp/' . $filtro->name);

        return $pdf->stream("LIQUIDACION_".$today.".pdf");

    }

    public function getSummary ($parameter) {
        $filtro = json_decode($parameter);

        return LiquidationProjectItem::with("biz_project.biz_client", "biz_item")
                            //->selectRaw("biz_liquidation.*")
                            ->join("biz_liquidation", "biz_liquidation.idliquidation","=", "biz_liquidationprojectitem.idliquidation")
                            ->whereRaw("biz_liquidation.dateend LIKE '%".$filtro->Fecha."%'")
                           //->whereRaw("biz_liquidation.dateend < '2018-10-01'")
                            ->orderBy("biz_liquidation.dateend","DESC")
                            ->get();
    }
}
