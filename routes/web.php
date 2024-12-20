<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'AppController@index')->name('home');
Route::get('/profile', 'AppController@profile')->name('profile');
Route::get('/users', 'AppController@users')->name('users');
Route::get('/roles', 'AppController@roles')->name('roles');
Route::get('/permissions', 'AppController@permissions')->name('permissions');
Route::get('/auditlogs', 'AppController@auditlogs')->name('auditlogs');
