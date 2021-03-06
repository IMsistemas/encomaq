<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Nomenclature\IndetifyType;
use App\Models\Biz\Carrier;
use App\Models\Biz\Client;
class IdentifyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$data = IndetifyType::whereRaw("state=1")->get();
        $data = IndetifyType::all();
        return  Response::json($data,200);
    }

    public function active()
    {
        return IndetifyType::where('state', 1)->get();
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
        if ($this->existtypeidentify($data["identifytypename"], null) == false) {
            $ident = new IndetifyType();
            $ident->identifytypename = $data["identifytypename"];
            $ident->identifylength = $data["identifylength"];
            $ident->state = 1;
            if($ident->save()){
                return response()->json(['success' => $ident ]);
            }else{
                return response()->json(['error' => $ident ]);
            }
        } else {
            return response()->json(['error' => 'exist' ]);
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
        if ($this->existtypeidentify($data["identifytypename"], $id) == false) {
            $ident= IndetifyType::find($id);
            $ident->identifytypename = $data["identifytypename"];
            $ident->identifylength = $data["identifylength"];
            if($ident->save()){
                return response()->json(['success' => $ident ]);
            }else{
                return response()->json(['error' => $ident ]);
            }
        }else {
            return response()->json(['error' => 'exist' ]);
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
        $ident = IndetifyType::find($id);
        if ($ident->state == 1) {
            $ident->state = 0;
        } else {
            $ident->state = 1;
        }
        if($ident->save()){
            return response()->json(['success' => $ident ]);
        }else{
            return response()->json(['error' => $ident ]);
        }
    }
    private function existtypeidentify($aux, $id)
    {
        $count = IndetifyType::where('identifytypename', $aux);
        if ($id != null) {
            $count = $count->where('ididentifytype', '!=' , $id);
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
    public function deleteidentify($id){
        $aux1 = Carrier::whereRaw("ididentifytype=".$id."")->get();
        $aux2 = Client::whereRaw("ididentifytype=".$id."")->get();
        if (count($aux1) == 0  &&  count($aux2) == 0 ) {
            $aux = IndetifyType::find($id); 
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
