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

//Routes for testing

Route::get('/faker/exercise', 'TestController@FakeExercises');

Route::get('/faker/set', 'TestController@FakeSets');

//Routes for testing AJAX
Route::get('/ajax/exercise', 'HomeController@indexData');
Route::get('/ajax/exercise/add', 'ExerciseController@addAjax');
Route::get('/ajax/exercise/{id}/btns', 'ExerciseController@GetButtons');
Route::get('/ajax/exercise/{id}/sets', 'ExerciseController@getSetsForDashboard');
Route::post('/ajax/set/store', 'WorkoutSetController@saveAjax');
Route::post('/ajax/set/{id}/update', 'WorkoutSetController@updateAjax');
