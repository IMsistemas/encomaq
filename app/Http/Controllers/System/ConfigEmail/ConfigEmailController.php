<?php

namespace App\Http\Controllers\System\ConfigEmail;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;
use App\Models\System\ConfigEmail;

class ConfigEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = ConfigEmail::all();
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
        $email = new ConfigEmail();
        $email->driver = $data["driver"];
        $email->server = $data["server"];
        $email->port = $data["port"];
        $email->encryptation = $data["encryptation"];
        $email->useremail = $data["useremail"];
        $email->passwordemail = $data["passwordemail"];
        if($email->save()){
            return response()->json(['success' => $email ]);
        }else{
            return response()->json(['error' => $email ]);
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
        $email = ConfigEmail::find($id);
        $email->driver = $data["driver"];
        $email->server = $data["server"];
        $email->port = $data["port"];
        $email->encryptation = $data["encryptation"];
        $email->useremail = $data["useremail"];
        $email->passwordemail = $data["passwordemail"];
        if($email->save()){
            return response()->json(['success' => $email ]);
        }else{
            return response()->json(['error' => $email ]);
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
