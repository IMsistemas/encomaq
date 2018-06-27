<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Liquidation;
use App\Models\Biz\Referralguideliquidation;
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
         $aux->state = 1;
         if ($aux->save()) {
             foreach ($data["list"] as $f) {
                 $real =  new Referralguideliquidation;
                 $real->idliquidation = $aux->idliquidation;
                 $real->idreferralguide = $f["idreferralguide"];
                 $real->save();
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
     
         $aux->dateinit = $data["dateinit"];
         $aux->dateend = $data["dateend"];
         $aux->observation = $data["observation"];
         $aux->subtotal = $data["subtotal"];
         $aux->iva = $data["iva"];
         $aux->total = $data["total"];
         $aux->state = 1;
         if ($aux->save()) {
             $temp = Referralguideliquidation::whereRaw("idliquidation=".$aux->idliquidation."")->delete();
             foreach ($data["biz_referralguideliquidation"] as $f) {
                 $real =  new Referralguideliquidation;
                 $real->idliquidation = $aux->idliquidation;
                 $real->idreferralguide = $f["idreferralguide"];
                 $real->save();
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
        $data = Liquidation::with("biz_referralguideliquidation.biz_referralguide.biz_contract.biz_client","biz_referralguideliquidation.biz_referralguide.biz_Referralguideitem.biz_item")
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
        $pdf->setPaper('A4', 'portrait');
        return $pdf->stream("ListaDeLiquidaciones".$today.".pdf");
    }     
}
