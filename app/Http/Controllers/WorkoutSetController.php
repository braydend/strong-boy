<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use View;
use Illuminate\Support\Facades\Redirect;
use App\WorkoutSet;
use App\Exercise;
use \Validator;
use Input;
use Session;

class WorkoutSetController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $sets = $user->workout_sets()->orderBy('created_at', 'desc')->paginate(10);

        return View::make('workout_set.index')
          ->with('sets', $sets);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $exercises = Exercise::all();
        return View::make('workout_set.create')
        ->with('exercises', $exercises);
    }

    /**
     * Show the form for creating a new resource.
     * Exercise will be pre selected in form
     *
     * @return \Illuminate\Http\Response
     */
    public function createWithId($id)
    {
        $exercise = Exercise::find($id);
        return View::make('workout_set.create')
        ->with('exercise', $exercise);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        //Validate
        $rules = array(
          'weight' => 'required|numeric|min:0',
          'reps' => 'required|numeric|min:0',
      );

        $weightFormat = Input::get('weightFormat');

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return Redirect::to('sets/create')
          ->withErrors($validator);
        } else {
            // Store the data to the Database
            // Convert weight from lb to kg
            if ($weightFormat == 'lb') {
                $weight = Input::get('weight') * 0.453592;
            } else {
                $weight = Input::get('weight');
            }
            $set = new WorkoutSet;
            $set->user_id = $user->id;
            $set->exercise_id = Input::get('exercise_id');
            $set->weight = $weight;
            $set->reps = Input::get('reps');
            $set->warmup = Input::get('warmup');
            $set->save();

            //Redirect
            Session::flash('message', 'Successfully logged workout! ' . $weightFormat);
            return Redirect::to('/');
        }
    }

    public function updateAjax(Request $request, $id)
    {
        $user = Auth::user();

        $weightFormat = $request->request->get('weightFormat');
        // Store the data to the Database
        // Convert weight from lb to kg
        if ($weightFormat == 'lb') {
            $weight = $request->request->get('weight') * 0.453592;
        } else {
            $weight = $request->request->get('weight');
        }
        $set = WorkoutSet::find($id);
        $set->user_id = $user->id;
        $set->weight = $weight;
        $set->reps = $request->request->get('reps');
        $set->warmup = $request->request->get('warmup');
        $set->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        $set = $user->workout_sets()->find($id);
        return View::make('workout_set.show')
          ->with('set', $set);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $set = WorkoutSet::find($id);
        return View::make('workout_set.edit')
          ->with('set', $set);
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
          'weight' => 'required|numeric',
          'reps' => 'required|numeric',
      );

        $validator = Validator::make(Input::all(), $rules);

        $weightFormat = Input::get('weightFormat');

        if ($validator->fails()) {
            return Redirect::to('workout_set/edit')
          ->withErrors($validator);
        } else {
            if ($weightFormat == 'lb') {
                $weight = Input::get('weight') * 0.453592;
            } else {
                $weight = Input::get('weight');
            }
            $user = Auth::user();
            //Store the data to the Database
            $set = WorkoutSet::find($id);
            $set->user_id = $user->id;
            $set->exercise_id = Input::get('exercise_id');
            $set->weight = Input::get('weight');
            $set->reps = Input::get('reps');
            $set->warmup = Input::get('warmup');
            $set->weight = $weight;

            $set->save();

            //Redirect
            Session::flash('message', 'Successfully updated workout!');
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
        $set = WorkoutSet::find($id);
        $set->delete();

        Session::flash('message', 'Successfully deleted the workout');
        return Redirect::to('/');
    }
}
