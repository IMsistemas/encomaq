<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\Place;
use App\Models\Biz\ReferralGuidePlace;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlaceController extends Controller
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
        return Place::orderBy('idplace', 'desc')->get();
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
        $object = new Place();

        $object->placename = $request->input('placename');
        $object->state = 1;

        if ($object->save()) {
            return response()->json(['success' => true]);
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
        $object = Place::find($id);

        $object->placename = $request->input('placename');

        if ($object->save()) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['success' => false]);
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
        $object_relations = ReferralGuidePlace::whereRaw(
            'idplace_start = ' . $id . ' OR idplace_end = ' . $id
        )->count();

        if ($object_relations == 0) {

            ReferralGuidePlace::whereRaw(
                'idplace_start = ' . $id . ' OR idplace_end = ' . $id
            )->delete();

            $object_place = Place::find($id);

            if ($object_place->delete()) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['success' => false]);
            }

        } else {
            return response()->json(['success' => false, 'relations' => true]);
        }
    }
}
