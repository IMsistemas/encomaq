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
    Route::get('Identifytype/delete/{id}', 'Configuration\IdentifyController@deleteidentify');
    Route::resource('Identifytype', 'Configuration\IdentifyController');
});

Route::get('role/getPermission/{id}', 'System\Role\RoleController@getPermission');
Route::get('role/getActiveRole', 'System\Role\RoleController@getActiveRole');
Route::get('role/getListRole', 'System\Role\RoleController@getListRole');
Route::resource('role', 'System\Role\RoleController');

Route::resource('login', 'System\Login\LoginController');

Route::group(['middleware' => 'cors'], function(){
    Route::get('CategoryItem/delete/{id}', 'Configuration\CategoryController@deletecategory');
    Route::resource('CategoryItem', 'Configuration\CategoryController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Transferreason/delete/{id}', 'Configuration\TransferReasonController@deletetransseferreason');
    Route::resource('Transferreason', 'Configuration\TransferReasonController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('UnitType/delete/{id}', 'Configuration\UnitTypeController@deleteunit');
    Route::resource('UnitType', 'Configuration\UnitTypeController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('user/getListUser', 'System\User\UserController@getListUser');
    Route::put('user/updateState/{id}', 'System\User\UserController@updateState');
    Route::resource('user', 'System\User\UserController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('company/get', 'Biz\Company\CompanyController@get');
    Route::resource('company', 'Biz\Company\CompanyController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('WareHouse/state/{id}', 'Biz\WareHouseController@statewarehouse');
    Route::resource('WareHouse', 'Biz\WareHouseController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Item/filtro/{text}', 'Biz\ItemController@itemfiltro');
    Route::get('Item/state/{id}', 'Biz\ItemController@stateitem');
    Route::resource('Item', 'Biz\ItemController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::resource('ConfigEmail', 'System\ConfigEmail\ConfigEmailController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Client/filtro/{text}', 'Biz\ClienteController@clientfiltro');
    Route::get('Client/state/{id}', 'Biz\ClienteController@stateitem');
    Route::resource('Client', 'Biz\ClienteController');
});