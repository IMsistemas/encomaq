<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Project;
use App\Models\Biz\Company;

class ProjectController extends Controller
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
        if ($this->existproject($data["projectname"], null) == false ) {
            $aux = new Project();
            $aux->idclient = $data["idclient"];
            $aux->projectname = $data["projectname"];
            $aux->place = $data["place"];
            $aux->state = 1;
            if($aux->save()){
                
                return response()->json(['success' => $aux ]);
            } else {
                return response()->json(['error' => $aux]);        
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
        if ($this->existproject($data["projectname"], $id) == false ) {
            $aux =  Project::find($id);
            $aux->idclient = $data["idclient"];
            $aux->projectname = $data["projectname"];
            $aux->place = $data["place"];
            $aux->state = 1;
            if($aux->save()){
                
                return response()->json(['success' => $aux ]);
            } else {
                return response()->json(['error' => $aux]);        
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
        $aux = Project::find($id); 
        if ($aux->delete()) {
            return response()->json(['success' => true ]);
        } else {
            return response()->json(['error' => 'error' ]);
        }
    }
    public function projectfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));
        $sql = "";
        /*if ($filtro->Buscar != "") {
            $sql .= " OR idclient IN (SELECT biz_client.idclient FROM biz_client WHERE (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%'))";
        }*/

        if ($filtro->state != null) {
            $data = Project::with("biz_client")
                ->selectRaw("biz_project.*")
                ->join("biz_client", "biz_client.idclient", "=", "biz_project.idclient")
                ->whereRaw(" biz_project.state='".$filtro->state."' AND  ( biz_project.projectname  LIKE '%".$filtro->Buscar."%'  OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%'))  ")
                ->orderBy("".$filtro->column, "".$filtro->order);
        } else {
            $data = Project::with("biz_client")
                ->selectRaw("biz_project.*")
                ->join("biz_client", "biz_client.idclient", "=", "biz_project.idclient")
                ->orderBy("".$filtro->column, "".$filtro->order);
        }

        return  $data->paginate($filtro->num_page);
    }

    public function projectclient($id) 
    {
        return  Project::whereRaw(" biz_project.state='1' AND   biz_project.idclient='".$id."'  ")
                        ->orderBy("biz_project.projectname","ASC")
                        ->get();
    }

    private function existproject($aux, $id)
    {
        $count = Project::where('projectname', $aux);
        if ($id != null) {
            $count = $count->where('idproject', '!=' , $id);
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
    public function stateproject($id)
    {
        $aux = Project::find($id);
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
       
       $data = Project::with("biz_client")
                        ->selectRaw("biz_project.*")
                        ->join("biz_client", "biz_client.idclient", "=", "biz_project.idclient")
                        ->whereRaw(" ( biz_project.projectname  LIKE '%".$filtro->Buscar."%'  OR (biz_client.businessname LIKE '%".$filtro->Buscar."%' OR biz_client.identify LIKE '%".$filtro->Buscar."%'))  ")
                        ->orderBy("".$filtro->column, "".$filtro->order)
                        ->get();

        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListProject', compact('data','company'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("ListaDeProyectos".$today.".pdf");
    } 
}
