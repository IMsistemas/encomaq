<?php

namespace App\Http\Controllers\Biz;

use App\Models\Biz\LiquidationItemSurplus;
use App\Models\Biz\Referralguideitem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Biz\ItemPrice;

class ItemPriceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    public function getItemPriceByID($id)
    {
        $objectReferralGuideItem = Referralguideitem::where('iditemprice', $id)->get();
        $objectLiquidationItem = LiquidationItemSurplus::where('iditemprice', $id)->get();

        if (count($objectReferralGuideItem) > 0 && count($objectLiquidationItem) > 0) {
            return ['success' => true];
        } else {
            return ['success' => false];
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
        $object = ItemPrice::find($id);

        $object->price = $request->input('price');

        if ($object->save()) {

            $objectReferralGuideItem = Referralguideitem::where('iditemprice', $id)->get();
            foreach ($objectReferralGuideItem as $item) {
                $object = Referralguideitem::find($item->idreferralguideitem);
                $object->price = $request->input('price');
                if ($object->save() == false) {
                    return response()->json(['success' => false ]);
                }
            }

            $objectLiquidationItem = LiquidationItemSurplus::where('iditemprice', $id)->get();
            foreach ($objectLiquidationItem as $item) {
                $object = LiquidationItemSurplus::find($item->idliquidationitemsurplus);
                $object->price = $request->input('price');
                if ($object->save() == false) {
                    return response()->json(['success' => false ]);
                }
            }

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
    /**
     * 
     */
    public function priceForItem ($idItem) {
        return ItemPrice::whereRaw("iditem=".$idItem."")->get();
    }
}
