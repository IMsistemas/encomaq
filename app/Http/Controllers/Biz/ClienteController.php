<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Referralguide;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Client;
use App\Models\Biz\Contract;
use App\Models\Biz\Project;
use App\Models\Biz\Company;


class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Client::all();
        return  Response::json($data,200);
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
            $aux->phone_2 = $data["phone_2"];
            $aux->address = $data["address"];
            $aux->email = $data["email"];
            $aux->email_2 = $data["email_2"];
            $aux->email_3 = $data["email_3"];
            $aux->observation = $data["observation"];
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
        $data = $request->all();
        if ($this->existclient($data["identify"], $id) == false ) {
            $aux = Client::find($id);
            $aux->ididentifytype = $data["ididentifytype"];
            $aux->businessname = $data["businessname"];
            $aux->identify = $data["identify"];
            $aux->phone = $data["phone"];
            $aux->phone_2 = $data["phone_2"];
            $aux->address = $data["address"];
            $aux->email = $data["email"];
            $aux->email_2 = $data["email_2"];
            $aux->email_3 = $data["email_3"];
            $aux->observation = $data["observation"];
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
    public function clientfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));

        if (isset($filtro->type) && $filtro->type == 1) {

            $where = " biz_referralguide.state ='1' AND (biz_client.businessname  LIKE '%".$filtro->Buscar."%' OR biz_client.identify  LIKE '%".$filtro->Buscar."%')";
            return Referralguide::with('biz_contract.biz_client.biz_Project')->selectRaw("biz_client.*,  biz_contract.*")
                ->join("biz_contract", "biz_contract.idcontract", "=", "biz_referralguide.idcontract")
                ->join("biz_client", "biz_client.idclient", "=", "biz_contract.idclient" )
                ->whereRaw($where)
                ->orderBy("biz_client.businessname", "ASC")
                ->groupBy("biz_client.idclient")
                ->paginate($filtro->num_page);

        } else {

            $sql = "";
            if ($filtro->ididentifytype != "") {
                $sql .= " AND ididentifytype =".$filtro->ididentifytype." ";
            }
            $data = Client::with("nom_identifytype")
                ->whereRaw("(businessname  LIKE '%".$filtro->Buscar."%' OR identify  LIKE '%".$filtro->Buscar."%')  AND state='".$filtro->state."'".$sql)
                ->orderBy("".$filtro->column, "".$filtro->order);
            return  $data->paginate($filtro->num_page);

        }


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
    public function exportarpdf ($data) {
        ini_set('max_execution_time', 300);
        $filtro = json_decode($data);
        $sql = "";
        if ($filtro->ididentifytype != "") {
            $sql .= " AND ididentifytype =".$filtro->ididentifytype." ";
        }
        $data = Client::with("nom_identifytype")
                        // ->whereRaw("(businessname  LIKE '%".$filtro->Buscar."%' OR identify  LIKE '%".$filtro->Buscar."%')  AND state='".$filtro->state."'".$sql)
                        ->whereRaw("(businessname  LIKE '%".$filtro->Buscar."%' OR identify  LIKE '%".$filtro->Buscar."%') " . $sql)
                        ->orderBy("".$filtro->column, "".$filtro->order)
                        ->get();
        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListClient', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("ListaDeClientes".$today.".pdf");
    }     
}
