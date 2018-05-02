<?php

namespace App\Http\Controllers\Configuration;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\Nomenclature\TransferReason;

class TransferReasonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$data = TransferReason::whereRaw("state=1")->get();
        $data = TransferReason::all();
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
        if ($this->existtransfer($data["transferreasonname"], null) ==  false ) {
            $transfer = new TransferReason();
            $transfer->transferreasonname = $data["transferreasonname"];
            $transfer->state = 1;
            if($transfer->save()){
                return response()->json(['success' => $transfer ]);
            }else{
                return response()->json(['error' => $transfer ]);
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
        if ($this->existtransfer($data["transferreasonname"], $id) ==  false ) {
            $transfer= TransferReason::find($id);
            $transfer->transferreasonname = $data["transferreasonname"];
            if($transfer->save()){
                return response()->json(['success' => $transfer ]);
            }else{
                return response()->json(['error' => $transfer ]);
            }
        } else {
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
        $transfer = TransferReason::find($id);
        if ($transfer->state == 1) {
            $transfer->state = 0;
        } else {
            $transfer->state = 1;
        }
        if($transfer->save()){
            return response()->json(['success' => $transfer ]);
        }else{
            return response()->json(['error' => $transfer ]);
        }
    }

    private function existtransfer($aux, $id)
    {
        $count = TransferReason::where('transferreasonname', $aux);
        if ($id != null) {
            $count = $count->where('idtransferreason', '!=' , $id);
        }
        $count = $count->count();
        return ($count == 0) ? false : true;
    }
}
