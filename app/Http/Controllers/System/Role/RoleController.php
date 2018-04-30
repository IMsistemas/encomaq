<?php

namespace App\Http\Controllers\System\Role;

use App\Models\System\Role;
use App\Models\System\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
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

    public function getListRole()
    {
        return Role::orderBy('rolename', 'asc')->get();
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
        $role = new Role();

        $role->rolename = $request->input('rolename');

        if ($role->save()) {

            return response()->json(['success' => true ]);

        } else {

            return response()->json(['success' => false ]);

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
        $role = Role::find($id);

        $role->rolename = $request->input('rolename');

        if ($role->save()) {

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
        $count_user = User::where('idrole', $id)->count();

        if ($count_user == 0) {

            $role = Role::find($id);

            if ($role->delete()) {

                return response()->json(['success' => true ]);

            } else {

                return response()->json(['success' => false ]);

            }

        } else {

            return response()->json(['success' => false, 'dependence' => true ]);

        }
    }
}
