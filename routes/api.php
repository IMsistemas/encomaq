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

Route::get('role/getListRole', 'System\Role\RoleController@getListRole');
Route::resource('role', 'System\Role\RoleController');

Route::get('login/logout', 'System\Login\LoginController@logout');
Route::get('login/getSessionExist', 'System\Login\LoginController@getSessionExist');
Route::resource('login', 'System\Login\LoginController');