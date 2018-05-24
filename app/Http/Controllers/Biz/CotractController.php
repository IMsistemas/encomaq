<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Contract;
use App\Models\Biz\ContractItem;

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
        // (int) $last->nocontract
        //         $str = "2";
        //  echo str_pad($str,9,"0",STR_PAD_LEFT );
        $data = $request->all();

         $aux = new Contract();
         $aux->idclient = $data["Data"]["idclient"];
         $aux->nocontract = str_pad((((int) $last->nocontract) + 1 ),9,"0", STR_PAD_LEFT );;
         $aux->startdate = $data["Data"]["startdate"];
         $aux->enddate = $data["Data"]["enddate"];
         $aux->area = $data["Data"]["area"];
         $aux->period = $data["Data"]["period"];
         $aux->cost = $data["Data"]["cost"];
         $aux->guarantee = $data["Data"]["guarantee"];
         $aux->observation = $data["Data"]["observation"];
         $aux->state = 1;
         if ($aux->save()) {
             foreach ($data["list"] as $f) {
                $caux = new ContractItem();
                $caux->idcontract = $aux->idcontract;
                $caux->iditem = $f["iditem"];
                $caux->quantity = $f["quantity"];
                $caux->observation = $f["observation"];
                $caux->save();
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
        //
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
    public function contractfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));
        $data = Contract::with("biz_client","biz_contractitem")
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient")
                        ->whereRaw("biz_contract.state='".$filtro->state."' AND ( biz_contract.nocontract LIKE '%".$filtro->Buscar."%' OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%') )")
                        ->orderBy("".$filtro->column, "".$filtro->order);

        return  $data->paginate($filtro->num_page);
    }    
}
