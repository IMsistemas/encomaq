<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Contract;
use App\Models\Biz\ContractItem;
use App\Models\Biz\Referralguide;


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
        $data = $request->all();
        $aux =  Contract::find($id);
        $aux->idclient = $data["idclient"];
        $aux->startdate = $data["startdate"];
        $aux->enddate = $data["enddate"];
        $aux->area = $data["area"];
        $aux->period = $data["period"];
        $aux->cost = $data["cost"];
        $aux->guarantee = $data["guarantee"];
        $aux->observation = $data["observation"];
        $aux->state = 1;
        if ($aux->save()) {
            $temp = ContractItem::whereRaw("idcontract='".$id."'")->delete();
             foreach ($data["biz_contractitem"] as $f) {
                $caux = new ContractItem();
                $caux->idcontract = $id;
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
        $data = Contract::with("biz_client","biz_contractitem")
                        ->selectRaw("biz_contract.*")
                        ->join("biz_client","biz_client.idclient","=","biz_contract.idclient")
                        ->whereRaw("biz_contract.state='".$filtro->state."' AND ( biz_contract.nocontract LIKE '%".$filtro->Buscar."%' OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%') )")
                        ->orderBy("".$filtro->column, "".$filtro->order);

        return  $data->paginate($filtro->num_page);
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
}
