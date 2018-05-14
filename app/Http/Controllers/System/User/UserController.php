<?php

namespace App\Http\Controllers\System\User;

use App\Models\System\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
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

    public function getListUser()
    {
        return User::with('role')->orderBy('personname', 'asc')->get();
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

    private function searchExistUser($email, $id)
    {
        $count = User::where('email', $email);

        if ($id != null) {
            $count = $count->where('iduser', '!=' , $id);
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
        if ($this->searchExistUser($request->input('email'), null) == false) {

            $user = new User();

            $user->idrole = $request->input('idrole');
            $user->personname = $request->input('personname');
            $user->lastnameperson = $request->input('lastnameperson');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            $user->state = 1;

            if ($user->save()) {

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
        if ($this->searchExistUser($request->input('email'), $id) == false) {

            $user = User::find($id);

            $user->idrole = $request->input('idrole');
            $user->personname = $request->input('personname');
            $user->lastnameperson = $request->input('lastnameperson');
            $user->email = $request->input('email');
            $user->token = null;

            if ($request->input('password') != '' && $request->input('password') != $user->password) {

                $user->password = Hash::make($request->input('password'));

            }

            if ($user->save()) {


                $userProfile = User::with('role')->where( 'email', $request->input('email' ) )
                                        ->where('state', 1)->get();


                return response()->json(['success' => true, 'user' => $userProfile[0]]);

            } else {

                return response()->json(['success' => false ]);

            }

        } else {

            return response()->json(['success' => false, 'exist' => true]);

        }
    }

    public function updateState(Request $request, $id)
    {
        $user = User::find($id);

        if($request->input('state') == 1){

            $user->state = 0;

        } else {

            $user->state = 1;

        }

        if ($user->save()) {

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
        $user = User::find($id);

        if ($user->delete()) {

            return response()->json(['success' => true ]);

        } else {

            return response()->json(['success' => false ]);

        }
    }
}
