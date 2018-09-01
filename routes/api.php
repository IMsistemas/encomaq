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
    Route::get('Identifytype/active', 'Configuration\IdentifyController@active');
    Route::get('Identifytype/delete/{id}', 'Configuration\IdentifyController@deleteidentify');
    Route::resource('Identifytype', 'Configuration\IdentifyController');
});

Route::get('role/save_permissionrole/{data}', 'System\Role\RoleController@save_permissionrole');
Route::get('role/getPermission/{id}', 'System\Role\RoleController@getPermission');
Route::get('role/getActiveRole', 'System\Role\RoleController@getActiveRole');
Route::get('role/getListRole', 'System\Role\RoleController@getListRole');
Route::resource('role', 'System\Role\RoleController');

Route::get('login/changePassword/{token}', 'System\Login\LoginController@changePassword');
Route::post('login/resetPassword', 'System\Login\LoginController@resetPassword');
Route::resource('login', 'System\Login\LoginController');


Route::group(['middleware' => 'cors'], function(){
    Route::get('CategoryItem/active', 'Configuration\CategoryController@active');
    Route::get('CategoryItem/delete/{id}', 'Configuration\CategoryController@deletecategory');
    Route::resource('CategoryItem', 'Configuration\CategoryController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Transferreason/getTypeTransferReason', 'Configuration\TransferReasonController@getTypeTransferReason');
    Route::get('Transferreason/getTransferActive', 'Configuration\TransferReasonController@getTransferActive');
    Route::get('Transferreason/delete/{id}', 'Configuration\TransferReasonController@deletetransseferreason');
    Route::resource('Transferreason', 'Configuration\TransferReasonController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('UnitType/active', 'Configuration\UnitTypeController@active');
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
    Route::get('period/get', 'Configuration\PeriodController@get');
    Route::resource('period', 'Configuration\PeriodController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('paymentform/getList', 'Configuration\PaymentFormController@getList');
    Route::get('paymentform/get', 'Configuration\PaymentFormController@get');
    Route::resource('paymentform', 'Configuration\PaymentFormController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('place/get', 'Biz\PlaceController@get');
    Route::resource('place', 'Biz\PlaceController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('WareHouse/state/{id}', 'Biz\WareHouseController@statewarehouse');
    Route::resource('WareHouse', 'Biz\WareHouseController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Item/exportarpdf/{data}', 'Biz\ItemController@exportarpdf');
    Route::get('Item/filtro', 'Biz\ItemController@itemfiltro');
    Route::get('Item/state/{id}', 'Biz\ItemController@stateitem');
    Route::resource('Item', 'Biz\ItemController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::resource('ConfigEmail', 'System\ConfigEmail\ConfigEmailController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Client/exportarpdf/{data}', 'Biz\ClienteController@exportarpdf');
    Route::get('Client/filtro', 'Biz\ClienteController@clientfiltro');
    Route::get('Client/state/{id}', 'Biz\ClienteController@stateclient');
    Route::resource('Client', 'Biz\ClienteController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Project/clientproject/{id}', 'Biz\ProjectController@projectclient');
    Route::get('Project/exportarpdf/{data}', 'Biz\ProjectController@exportarpdf');
    Route::get('Project/filtro', 'Biz\ProjectController@projectfiltro');
    Route::get('Project/state/{id}', 'Biz\ProjectController@stateproject');
    Route::resource('Project', 'Biz\ProjectController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('carrier/filtro', 'Biz\CarrierController@carrierfiltro');
    Route::get('carrier/get', 'Biz\CarrierController@get');
    Route::put('carrier/updateState/{id}', 'Biz\CarrierController@updateState');
    Route::resource('carrier', 'Biz\CarrierController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Contract/getPFByContract/{id}', 'Biz\CotractController@getPFByContract');
    Route::get('Contract/exportarpdfid/{data}', 'Biz\CotractController@exportarpdfid');
    Route::get('Contract/exportarpdf/{data}', 'Biz\CotractController@exportarpdf');
    Route::get('Contract/getContractActive', 'Biz\CotractController@getContractActive');
    Route::get('Contract/filtro', 'Biz\CotractController@contractfiltro');
    Route::get('Contract/state/{id}', 'Biz\CotractController@statecontract');
    Route::resource('Contract', 'Biz\CotractController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('referralguide/exportarpdfid/{data}', 'Biz\ReferralGuideController@exportarpdfid');
    Route::get('referralguide/listclient_referralguide', 'Biz\ReferralGuideController@listclient_referralguide');
    Route::get('referralguide/exportarpdf/{data}', 'Biz\ReferralGuideController@exportarpdf');
    Route::get('referralguide/get', 'Biz\ReferralGuideController@get');
    Route::get('referralguide/updateState/{id}', 'Biz\ReferralGuideController@updateState');
    Route::resource('referralguide', 'Biz\ReferralGuideController');
});

Route::group(['middleware' => 'cors'], function(){
    Route::get('Liquidation/exportarpdfid/{data}', 'Biz\LiquidationController@exportarpdfid');
    Route::get('Liquidation/exportarpdf/{data}', 'Biz\LiquidationController@exportarpdf');
    Route::get('Liquidation/getLiquidationActive', 'Biz\LiquidationController@getLiquidationtActive');
    Route::get('Liquidation/filtro', 'Biz\LiquidationController@liquidationfiltro');
    Route::get('Liquidation/state/{id}', 'Biz\LiquidationController@stateliquidation');
    Route::resource('Liquidation', 'Biz\LiquidationController');
});