<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Client;
use App\Models\Biz\Contract;
use App\Models\Biz\Project;

class ClienteController extends Controller
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
        $data = $request->all();
        if ($this->existclient($data["identify"], null) == false ) {
            $aux = new Client();
            $aux->ididentifytype = $data["ididentifytype"];
            $aux->businessname = $data["businessname"];
            $aux->identify = $data["identify"];
            $aux->phone = $data["phone"];
            $aux->address = $data["address"];
            $aux->email = $data["email"];
            $aux->state = 1;
            if($aux->save()){
                return response()->json(['success' => $aux ]);
            }else{
                return response()->json(['error' => $aux ]);
            }
        } else {
            return response()->json(['error' => 'exist']);
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
        $aux1 = Contract::whereRaw("idclient=".$id."")->get();
        $aux2 = Project::whereRaw("idclient=".$id."")->get();
        if (count($aux1) == 0 && count($aux2) == 0) {
            $aux = Client::find($id); 
            if ($aux->delete()) {
                return response()->json(['success' => true ]);
            } else {
                return response()->json(['error' => 'error' ]);
            }
        }else {
            return response()->json(['error' => 'used' ]);
        }
    }
    public function clientfiltro($parametro) 
    {
        $filtro = json_decode($parametro);
        $sql = "";
        if ($filtro->ididentifytype != "") {
            $sql .= " AND ididentifytype =".$filtro->ididentifytype." ";
        }
        $data = Client::with("nom_identifytype")
                        ->whereRaw("(businessname  LIKE '%".$filtro->Buscar."%' OR identify  LIKE '%".$filtro->Buscar."%')".$sql)
                        ->get();
        return  Response::json($data,200);
    }
    private function existclient($aux, $id)
    {
        $count = Client::where('identify', $aux);
        if ($id != null) {
            $count = $count->where('idclient', '!=' , $id);
        }
        $count = $count->count();
        return ($count == 0) ? false : true;
    }
        /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function stateclient($id)
    {
        $aux = Client::find($id);
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
