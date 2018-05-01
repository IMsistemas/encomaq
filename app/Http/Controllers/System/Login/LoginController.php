<?php

namespace App\Http\Controllers\System\Login;

use App\Models\System\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
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

    public function logout()
    {
        Session::flush();

        return response()->json(['success' => true]);
    }

    public function getSessionExist()
    {
        if (Session::has('users') == false) {

            return response()->json(['success' => false ]);

        } else {

            return response()->json(['success' => true ]);

        }
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
        $user = User::where( 'email', $request->input('email' ) )->where('state', 1)->get();

        if ( count( $user ) > 0 ) {

            if( Hash::check( $request->input('password'), $user[0]->password  ) ) {

                Session::put('users', $user[0]);

                return response()->json(['success' => true]);

            } else {

                return response()->json(['success' => false]);

            }

        } else {

            return response()->json(['success' => false]);

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
}
