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

Route::get('/', 'HomeController@index')->name('home');

Auth::routes();


//Route::Resource('/exercise', 'ExerciseController');
Route::get('/exercise', 'ExerciseController@index');
Route::get('/ajax/exercise/{id}/chart', 'ExerciseController@getChartData');

// API for app
Route::get('/int-api/exercises', 'ApiController@getExercises');
Route::post('/int-api/exercise/add', 'ApiController@addExercise');
Route::get('int-api/exercise/{id}/sets', 'ApiController@getSets');
Route::post('/int-api/set/store', 'ApiController@addSet');



//Create set with exercise id
Route::get('/sets/create/{id}', 'WorkoutSetController@createWithId');

//Routes for testing

Route::get('/faker/exercise', 'TestController@FakeExercises');

Route::get('/faker/set', 'TestController@FakeSets');

//Routes for testing AJAX
Route::post('/ajax/set/{id}/update', 'WorkoutSetController@updateAjax');
