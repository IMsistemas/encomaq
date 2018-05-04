<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Nomenclature\CategoryItem;
use App\Models\Biz\Item;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$data = CategoryItem::whereRaw("state=1")->get();
        $data = CategoryItem::all();
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
        if ($this->existcategory($data["categoryitemname"], null) == false) {
            $aux = new CategoryItem();
            $aux->categoryitemname = $data["categoryitemname"];
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
        if ($this->existcategory($data["categoryitemname"], $id) == false) {
            $aux= CategoryItem::find($id);
            $aux->categoryitemname = $data["categoryitemname"];
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
        $aux = CategoryItem::find($id);
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

    private function existcategory($category, $id)
    {
        $count = CategoryItem::where('categoryitemname', $category);
        if ($id != null) {
            $count = $count->where('idcategoryitem', '!=' , $id);
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
    public function deletecategory($id){
        $aux1 = Item::whereRaw("idcategoryitem=".$id."")->get();
        if (count($aux1) == 0) {
            $aux = CategoryItem::find($id); 
            if ($aux->delete()) {
                return response()->json(['success' => true ]);
            } else {
                return response()->json(['error' => 'error' ]);
            }
        }else {
            return response()->json(['error' => 'used' ]);
        }
    }    
}
