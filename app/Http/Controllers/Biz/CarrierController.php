<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Carrier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CarrierController extends Controller
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

    public function get()
    {
        return Carrier::with('nom_identifytype')->orderBy('carriername', 'asc')->get();
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

    private function searchExist($identify, $id)
    {
        $count = Carrier::where('identify', $identify);

        if ($id != null) {
            $count = $count->where('idcarrier', '!=' , $id);
        }

        $count = $count->count();

        return ($count == 0) ? false : true;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($this->searchExist($request->input('identify'), null) == false) {

            $object = new Carrier();

            $object->ididentifytype = $request->input('ididentifytype');
            $object->identify = $request->input('identify');
            $object->carriername = $request->input('carriername');
            $object->licenseplate = $request->input('licenseplate');

            $object->state = 1;

            if ($object->save()) {

                return response()->json(['success' => true ]);

            } else {

                return response()->json(['success' => false ]);

            }

        } else {

            return response()->json(['success' => false, 'exist' => true]);

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
        if ($this->searchExist($request->input('identify'), $id) == false) {

            $object = Carrier::find($id);

            $object->ididentifytype = $request->input('ididentifytype');
            $object->identify = $request->input('identify');
            $object->carriername = $request->input('carriername');
            $object->licenseplate = $request->input('licenseplate');

            if ($object->save()) {

                return response()->json(['success' => true ]);

            } else {

                return response()->json(['success' => false ]);

            }

        } else {

            return response()->json(['success' => false, 'exist' => true]);

        }
    }

    public function updateState(Request $request, $id)
    {
        $object = Carrier::find($id);

        if($request->input('state') == 1){

            $object->state = 0;

        } else {

            $object->state = 1;

        }

        if ($object->save()) {

            return response()->json(['success' => true ]);

        } else {

            return response()->json(['success' => false ]);

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
        $object = Carrier::find($id);

        if ($object->delete()) {

            return response()->json(['success' => true ]);

        } else {

            return response()->json(['success' => false ]);

        }
    }
    public function carrierfiltro(Request $request) 
    {
        $filtro = json_decode($request->get('filter'));
        $data = Carrier::with("nom_identifytype")
                        ->whereRaw("(identify  LIKE '%".$filtro->Buscar."%' OR carriername  LIKE '%".$filtro->Buscar."%' OR licenseplate  LIKE '%".$filtro->Buscar."%' ) AND state='".$filtro->state."' ")
                        ->orderBy("".$filtro->column, "".$filtro->order);

        return  $data->paginate($filtro->num_page);
    }

}
