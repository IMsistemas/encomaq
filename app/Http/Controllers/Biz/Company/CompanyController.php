<?php

namespace App\Http\Controllers\Biz\Company;

use App\Models\Biz\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
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
        return Company::all();
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
        if ($request->hasFile('file')) {

            $dirupload = 'uploads/image';

            $file = $request->file('file');
            $destinationPath = public_path() . '/' . $dirupload;
            $name = rand(0, 9999) . '_' . $file->getClientOriginalName();

            $company = Company::all();

            if (count($company) > 0) {

                if($file->move($destinationPath, $name)) {

                    $url_file = $dirupload . '/' . $name;

                    $company = Company::find($company[0]->idcompany);

                    $company->image = $url_file;

                    if ($company->save())  {

                        return response()->json(['success' => true]);

                    }

                } else {

                    return response()->json(['success' => false]);

                }

            } else {

                return response()->json(['success' => false]);

            }

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
        if ($id == 0) {

            $company = new Company();

        } else {

            $company = Company::find($id);

        }

        $company->businessname = $request->input('businessname');
        $company->tradename = $request->input('tradename');
        $company->identify = $request->input('identify');
        $company->phone = $request->input('phone');
        $company->address = $request->input('address');
        $company->email = $request->input('email');
        $company->urlweb = $request->input('urlweb');

        if ($company->save()) {

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
