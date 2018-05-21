<?php

namespace App\Http\Controllers\Biz;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Biz\Contract;

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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        //
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
}
