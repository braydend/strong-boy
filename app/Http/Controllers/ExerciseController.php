<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use View;
use Illuminate\Support\Facades\Redirect;
use App\Exercise;
use App\WorkoutSet;
use \Validator;
use Input;
use Session;

use Khill\Lavacharts\Lavacharts;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        if($user == null){
          return Redirect::to('/');
        }
        $exercises = Exercise::paginate(10);
        return View::make('exercise.index')
          ->with('exercises', $exercises)
          ->with('user', $user);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function create()
     {
       return View::make('exercise.create');
     }

     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {
       //Validate
       $rules = array(
           'name' => 'required'
       );

       $validator = Validator::make(Input::all(), $rules);

       if($validator->fails()){
         return Redirect::to('exercise/create')
           ->withErrors($validator);
         }else{
           //Store the data to the Database
           $exercise = new Exercise;
           $exercise->name = Input::get('name');
           $exercise->save();

           //Redirect
           Session::flash('message', 'Successfully created exercise!');
           return Redirect::to('/');
       }
     }

     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
        $exercise = Exercise::find($id);
        $user = Auth::user();

        //Graph progress
        $weight = \Lava::DataTable();

        $weight->addDateColumn('Date')
                    ->addNumberColumn('Weight used');

        foreach($exercise->workout_sets()->where('user_id', $user['id'])->get() as $set){
          $weight->addRow(array($set['created_at'], $set['weight']));
        }

        \Lava::LineChart('Weight', $weight, [
           'title' => 'Weights',
           'pointSize' => 5
        ]);

        //Store personal best
        $pb = WorkoutSet::where('exercise_id', '=', $id)->orderBy('weight', 'desc')->first()['id'];
        //get all sets
        $sets = $exercise->workout_sets()->where('user_id', $user['id'])->get();
        //display to user
         return View::make('exercise.show')
           ->with('exercise', $exercise)
           ->with('sets', $sets)
           ->with('pb_id', $pb);
     }

     /**
      * Show the form for editing the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function edit($id)
     {
         $exercise = Exercise::find($id);
         return View::make('exercise.edit')
           ->with('exercise', $exercise);
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
       //Validate
       $rules = array(
           'name' => 'required'
       );

       $validator = Validator::make(Input::all(), $rules);

       if($validator->fails()){
         return Redirect::to('exercise/edit')
           ->withErrors($validator);
         }else{
           //Store the data to the Database
           $exercise = Exercise::find($id);
           $exercise->name = Input::get('name');
           $exercise->save();

           //Redirect
           Session::flash('message', 'Successfully updated exercise!');
           return Redirect::to('/');
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
         $exercise = Exercise::find($id);
         $exercise->delete();

         Session::flash('message', 'Successfully deleted the exercise');
         return Redirect::to('/');
     }
 }
