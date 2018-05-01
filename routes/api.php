<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors'], function(){
    Route::resource('Identifytype', 'Configuration\IdentifyController');
});

Route::get('role/getPermission/{id}', 'System\Role\RoleController@getPermission');
Route::get('role/getListRole', 'System\Role\RoleController@getListRole');
Route::resource('role', 'System\Role\RoleController');

Route::resource('login', 'System\Login\LoginController');

Route::group(['middleware' => 'cors'], function(){
    Route::resource('CategoryItem', 'Configuration\CategoryController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::resource('Transferreason', 'Configuration\TransferReasonController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::resource('UnitType', 'Configuration\UnitTypeController');
});