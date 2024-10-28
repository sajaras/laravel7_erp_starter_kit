<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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



Route::group(['middleware' => ['auth:api']], function () {


    Route::get('/user/unreadnotifications','API\AuthUserController@unreadNotifications')->name('authuser.unreadNotifications');


    Route::apiResource('users', 'API\UserController');
    Route::apiResource('roles', 'API\RoleController');
    Route::apiResource('permissions', 'API\PermissionController');

    Route::get('/users/{id}/roles','API\UserController@getRoles')->name('users.roles');
    Route::post('/users/{id}/resetpassword','API\UserController@resetPassword')->name('users.resetPassword');
    
    Route::get('/roles/{id}/permissions','API\RoleController@getPermissions')->name('roles.permissions');
    
});   
