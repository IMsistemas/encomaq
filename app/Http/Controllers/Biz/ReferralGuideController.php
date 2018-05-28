<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Referralguide;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReferralGuideController extends Controller
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

    public function get(Request $request)
    {
        $filter = json_decode($request->get('filter'));

        $where = "(sequential LIKE '%" . $filter->search . "%' OR purchaseproof LIKE '%" . $filter->search . "%' ) ";
        $where .= "AND state = " . $filter->state;

        /*if ($filter->idcontract != '') {
            $where .= ' AND idcontract = ' . $filter->idcontract;
        }

        if ($filter->idtransferreason != '') {
            $where .= ' AND idtransferreason = ' . $filter->idtransferreason;
        }

        if ($filter->idcarrier != '') {
            $where .= ' AND idcarrier = ' . $filter->idcarrier;
        }*/

        return Referralguide::with('biz_contract', 'biz_carrier', 'nom_transferreason')
                                ->whereRaw($where)->orderBy($filter->column, $filter->order)
                                ->paginate($filter->num_page);
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

    public function updateState(Request $request, $id)
    {
        $guide = Referralguide::find($id);

        if($request->input('state') == 1){

            $guide->state = 0;

        } else {

            $guide->state = 1;

        }

        if ($guide->save()) {

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
        //
    }
}
