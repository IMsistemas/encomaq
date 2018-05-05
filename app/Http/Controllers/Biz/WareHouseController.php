<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Warehouse;
use App\Models\Biz\Company;

class WareHouseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Warehouse::all();
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
        if ($this->existwarehouse($data["warehousename"], null) == false ) {
            $aux = new Warehouse();
            $auxcom = Company::all();
            $aux->idcompany = $auxcom[0]->idcompany;
            $aux->warehousename = $data["warehousename"];
            $aux->address = $data["address"];
            $aux->phone = $data["phone"];
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
        if ($this->existwarehouse($data["warehousename"], $id) == false ) {
            $aux = Warehouse::find($id);
            $aux->warehousename = $data["warehousename"];
            $aux->address = $data["address"];
            $aux->phone = $data["phone"];
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
        $aux = Warehouse::find($id); 
        if ($aux->delete()) {
            return response()->json(['success' => true ]);
        } else {
            return response()->json(['error' => 'error' ]);
        }
        /*$aux1 = Company::whereRaw("idcompany=".$id."")->get();
        if (count($aux1) == 0) {
        }else {
            return response()->json(['error' => 'used' ]);
        }*/
    }

    private function existwarehouse($aux, $id)
    {
        $count = Warehouse::where('warehousename', $aux);
        if ($id != null) {
            $count = $count->where('idwarehouse', '!=' , $id);
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
    public function statewarehouse($id)
    {
        $aux = Warehouse::find($id);
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
