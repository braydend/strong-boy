<?php

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

Route::get('/', 'HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::Resource('/exercise', 'ExerciseController');

//Create set with exercise id
Route::get('/sets/create/{id}', 'WorkoutSetController@createWithId');

Route::Resource('/sets', 'WorkoutSetController');
