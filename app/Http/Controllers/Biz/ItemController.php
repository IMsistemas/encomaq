<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Item;
use App\Models\Biz\Referralguideitem;

class ItemController extends Controller
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
        if ($this->existitem($data["itemname"], null) == false ) {
            $aux = new Item();
            $aux->idcategoryitem = $data["idcategoryitem"];
            $aux->idunittype = $data["idunittype"];
            $aux->itemname = $data["itemname"];
            $aux->description = $data["description"];
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
        if ($this->existitem($data["itemname"], $id) == false ) {
            $aux = Item::find($id);
            $aux->idcategoryitem = $data["idcategoryitem"];
            $aux->idunittype = $data["idunittype"];
            $aux->itemname = $data["itemname"];
            $aux->description = $data["description"];
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
        $aux1 = Referralguideitem::whereRaw("iditem=".$id."")->get();
        if (count($aux1) == 0) {
            $aux = Item::find($id); 
            if ($aux->delete()) {
                return response()->json(['success' => true ]);
            } else {
                return response()->json(['error' => 'error' ]);
            }
        }else {
            return response()->json(['error' => 'used' ]);
        }
    }

    public function itemfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));
        $sql = "";
        if ($filtro->idcategoryitem != "") {
            $sql .= " AND idcategoryitem =".$filtro->idcategoryitem." ";
        } else if ($filtro->idunittype != "") {
            $sql .= " AND idunittype =".$filtro->idunittype." ";
        }
        $data = Item::with("nom_category","nom_unit")
                        ->whereRaw("(itemname  LIKE '%".$filtro->Buscar."%' OR description  LIKE '%".$filtro->Buscar."%')".$sql);

        return  $data->paginate(5);
    }
    private function existitem($aux, $id)
    {
        $count = Item::where('itemname', $aux);
        if ($id != null) {
            $count = $count->where('iditem', '!=' , $id);
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
    public function stateitem($id)
    {
        $aux = Item::find($id);
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
