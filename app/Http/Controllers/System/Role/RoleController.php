<?php

namespace App\Http\Controllers\System\Role;

use App\Models\System\Permission;
use App\Models\System\Role;
use App\Models\System\RolePermission;
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

    public function getActiveRole()
    {
        return Role::orderBy('rolename', 'asc')->get();
    }

    public function getPermission($id)
    {
        $permission = Permission::orderBy('permissionname', 'asc')->get();
        $permissionrole = RolePermission::with("sys_permission")->where('idrole', $id)->get();

        return [$permission, $permissionrole];
    }

    public function save_permissionrole($data)
    {
        $aux = json_decode($data);
        //$aux->idrole
        RolePermission::where('idrole', $aux->idrole)->delete();
        foreach ($aux->listpermission as $f) {
            $perm = new RolePermission;
            $perm->idrole = $aux->idrole;
            $perm->idpermission = $f->idpermission;
            $perm->save();
        }
        return response()->json(['success' => true ]);
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

    private function searchExistRol($rolename, $id)
    {
        $count = Role::where('rolename', $rolename);

        if ($id != null) {
            $count = $count->where('idrole', '!=' , $id);
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

        if ($this->searchExistRol($request->input('rolename'), null) == false) {

            $role = new Role();

            $role->rolename = $request->input('rolename');

            if ($role->save()) {

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

        if ($this->searchExistRol($request->input('rolename'), $id) == false) {

            $role = Role::find($id);

            $role->rolename = $request->input('rolename');

            if ($role->save()) {

                return response()->json(['success' => true ]);

            } else {

                return response()->json(['success' => false ]);

            }

        } else {

            return response()->json(['success' => false, 'exist' => true]);

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
