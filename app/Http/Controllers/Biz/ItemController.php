<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\ItemPrice;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Item;
use App\Models\Biz\Referralguideitem;
use App\Models\Biz\Company;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Item::whereRaw("state=1")->orderBy('itemname', 'asc')->get();
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
        $fulldata = $request->all();
        $data = json_decode($fulldata["Data"]);
        if( isset($data->iditem)) {
            $id = $data->iditem;
            // if ($this->existitem($data->itemname, $id) == false ) {
                $aux = Item::find($id);
                $aux->idcategoryitem = $data->idcategoryitem;
                $aux->idunittype = $data->idunittype;
                $aux->itemname = $data->itemname;
                $aux->description = $data->description;
                // $aux->price = $data->price;
                $aux->state = 1;
                if($aux->save()){

                    ItemPrice::where('iditem', $id)->delete();

                    foreach ($data->biz_itemprice as $element) {
                        $objectItemPrice = new ItemPrice();

                        $objectItemPrice->iditem = $id;
                        $objectItemPrice->price = $element->price;

                        if ($objectItemPrice->save() == false) {
                            return response()->json(['error' => $objectItemPrice ]);
                        }
                    }

                    if ($request->hasFile('file')) {
                        $dirupload = 'uploads/items';
                        $file = $request->file('file');
                        $destinationPath = public_path() . '/' . $dirupload;
                        $name = rand(0, 9999) . '_' . $file->getClientOriginalName();
                        if($file->move($destinationPath, $name)) {
                            $url_file = $dirupload . '/' . $name;
                            $auxfile = Item::find($aux->iditem);
                            if(isset($auxfile->image)) {
                                unlink(public_path() . '/' .$aux->image);    
                            }

                            $auxfile->image = $url_file;
                            if ($auxfile->save())  {
                                return response()->json(['success' => $auxfile]);
                            }
                        } else {
                            return response()->json(['error' => $auxfile]);
                        } 

                    }

                    return response()->json(['success' => $aux ]);
                }else{
                    return response()->json(['error' => $aux ]);
                }
            /*} else {
                return response()->json(['error' => 'exist']);
            }*/

        } else {
            // if ($this->existitem($data->itemname, null) == false ) {
                $aux = new Item();
                $aux->idcategoryitem = $data->idcategoryitem;
                $aux->idunittype = $data->idunittype;
                $aux->itemname = $data->itemname;
                $aux->description = $data->description;
                // $aux->price = $data->price;
                $aux->state = 1;
                if($aux->save()){

                    foreach ($data->list_price as $element) {
                        $objectItemPrice = new ItemPrice();

                        $objectItemPrice->iditem = $aux->iditem;
                        $objectItemPrice->price = $element;

                        if ($objectItemPrice->save() == false) {
                            return response()->json(['error' => $objectItemPrice ]);
                        }
                    }

                    if ($request->hasFile('file')) {
                        $dirupload = 'uploads/items';
                        $file = $request->file('file');
                        $destinationPath = public_path() . '/' . $dirupload;
                        $name = rand(0, 9999) . '_' . $file->getClientOriginalName();
                        if($file->move($destinationPath, $name)) {
                            $url_file = $dirupload . '/' . $name;
                            $auxfile = Item::find($aux->iditem);
                            $auxfile->image = $url_file;
                            if ($auxfile->save())  {
                                return response()->json(['success' => $auxfile]);
                            }
                        } else {
                            return response()->json(['error' => $auxfile]);
                        } 

                    }
                    return response()->json(['success' => $aux ]);
                }

            /*} else {
                return response()->json(['error' => 'exist']);
            }*/
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
        $fulldata = $request->all();
        $data = json_decode($fulldata["Data"]);
        // if ($this->existitem($data->itemname, $id) == false ) {
            $aux = Item::find($id);
            $aux->idcategoryitem = $data->idcategoryitem;
            $aux->idunittype = $data->idunittype;
            $aux->itemname = $data->itemname;
            $aux->description = $data->description;
            $aux->price = $data->price;
            $aux->state = 1;
            if($aux->save()){
                if ($request->hasFile('file')) {
                    $dirupload = 'uploads/items';
                    $file = $request->file('file');
                    $destinationPath = public_path() . '/' . $dirupload;
                    $name = rand(0, 9999) . '_' . $file->getClientOriginalName();
                    if($file->move($destinationPath, $name)) {
                        $url_file = $dirupload . '/' . $name;
                        $auxfile = Item::find($aux->iditem);
                        unlink(public_path() . '/' .$auxfile->image);
                        $auxfile->image = $url_file;
                        if ($auxfile->save())  {
                            return response()->json(['success' => $auxfile]);
                        }
                    } else {
                        return response()->json(['error' => $auxfile]);
                    } 

                }

                return response()->json(['success' => $aux ]);
            }else{
                return response()->json(['error' => $aux ]);
            }
        /*} else {
            return response()->json(['error' => 'exist']);
        }*/
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
            if(isset($aux->image)) {
                unlink(public_path() . '/' .$aux->image);
            }
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


        if ($filtro->state != null) {
            $data = Item::with("nom_category","nom_unit", 'biz_itemprice')
                ->whereRaw("(itemname  LIKE '%".$filtro->Buscar."%' OR description  LIKE '%".$filtro->Buscar."%') AND state='".$filtro->state."' ".$sql)
                ->orderBy("".$filtro->column, "".$filtro->order);
        } else {
            $data = Item::with("nom_category","nom_unit", 'biz_itemprice')
                ->orderBy("".$filtro->column, "".$filtro->order);
        }

        return  $data->paginate($filtro->num_page);
    }
    private function existitem($aux, $id)
    {
        /*$count = Item::where('itemname', $aux);
        if ($id != null) {
            $count = $count->where('iditem', '!=' , $id);
        }
        $count = $count->count();
        return ($count == 0) ? false : true;*/
        return false;
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

    public function exportarpdf ($paramentro) {
        ini_set('max_execution_time', 300);
        $filtro = json_decode($paramentro);
        $sql = "";
        if ($filtro->idcategoryitem != "") {
            $sql .= " AND idcategoryitem =".$filtro->idcategoryitem." ";
        } else if ($filtro->idunittype != "") {
            $sql .= " AND idunittype =".$filtro->idunittype." ";
        }
        $data = Item::with("nom_category","nom_unit", 'biz_itemprice')
                        ->whereRaw("(itemname  LIKE '%".$filtro->Buscar."%' OR description  LIKE '%".$filtro->Buscar."%') ".$sql)
                        ->orderBy("itemname", "ASC")
                        ->get();
        $company = Company::all();
        $today=date("Y-m-d H:i:s");
        $view =  \View::make('Print.ListItem', compact('data','company','filtro'))->render();
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream("ListaDeItems".$today.".pdf");
    } 
}
