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

    public function liquidationfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));

        $data = Liquidation::with("biz_liquidationproject.biz_project.biz_client",
                                            "biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client",
                                            "biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item",
                                            "biz_referralguideliquidation.biz_referralguide.nom_transferreason"
                        )
                        ->whereRaw("biz_liquidation.state='".$filtro->state."' AND ( biz_liquidation.number LIKE '%".$filtro->Buscar."%'  )")
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
       
       $data = Liquidation::with("biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client","biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item")
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

        $body = file_get_contents(public_path() . '/uploads/temp/' . $filtro->name);

        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.LiquidacionFormat', compact('body'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');

        unlink(public_path() . '/uploads/temp/' . $filtro->name);

        return $pdf->stream("LIQUIDACION_".$today.".pdf");

    }
}
