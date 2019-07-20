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
use Carbon\Carbon;
use DB;

use Khill\Lavacharts\Lavacharts;

class ExerciseController extends Controller
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
        if ($user == null) {
            return Redirect::to('/');
        }
        $exercises = Exercise::paginate(10);
        return View::make('exercise.index')
          ->with('exercises', $exercises)
          ->with('user', $user);
    }

    public function getSetsForDashboard($id)
    {
        $exercise = Exercise::find($id);
        return response()->json($exercise->dashboard_workout_sets);
    }

    public function AjaxIndex()
    {
        return View::make('exercise.ajax.index');
    }

    public function GetButtons($id)
    {
        $exercise = Exercise::find($id);
        $repPresets = $exercise->workout_sets_by_reps()->orderBy('reps')->groupBy('reps')->take('5')->get();
        $weightPresets = $exercise->workout_sets_by_weight()->orderBy('weight')->groupBy('weight')->take('5')->get();
        $btns = [$repPresets, $weightPresets];
        return response()->json($btns);
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

        if ($validator->fails()) {
            return Redirect::to('exercise/create')
           ->withErrors($validator);
        } else {
            //Store the data to the Database
            $exercise = new Exercise;
            $exercise->name = Input::get('name');
            $exercise->save();

            //Redirect
            Session::flash('message', 'Successfully created exercise!');
            return Redirect::to('/');
        }
    }

    public function addAjax()
    {
        $exercise = new Exercise;
        $exercise->name = Input::get('name');
        $exercise->save();
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

        //Get sets
        $allSets = Auth::user()->workout_sets()->orderBy('created_at')->where('exercise_id', $exercise->id)->get();
        $allSets = $allSets->groupBy(function ($date) {
            return Carbon::parse($date->created_at)->format('y-m-d'); // grouping by date
        });

        foreach ($allSets as $set) {
            //echo "<p>" . $set . "</p>";
            if ($set->first()['warmup'] == 0) {
                $weight->addRow(array($set->first()['created_at'], $set->max('weight')));
            }
        }

        \Lava::LineChart('Weight', $weight, [
           'title' => 'Weights',
           'pointSize' => 5
        ]);

        //Get associated muscles
        $muscles = $exercise->muscles()->get();
        //Store personal best
        $pb = $user->workout_sets()->where('exercise_id', '=', $id)->where('warmup', '0')->orderBy('weight', 'desc')->first()['id'];
        //get all sets
        $sets = $exercise->workout_sets()->where('user_id', $user['id'])->get()->sortByDesc('created_at');
        //display to user
        return View::make('exercise.show')
           ->with('exercise', $exercise)
           ->with('sets', $sets)
           ->with('pb_id', $pb)
            ->with('muscles', $muscles);
    }

    public function getSets($id)
    {
        $exercise = Exercise::find($id);
        $allSets = Auth::user()->workout_sets()->orderBy('created_at')->where('exercise_id', $exercise->id)->get();
        return(response()->json($allSets));
    }

    public function getChartData($id)
    {
        $exercise = Exercise::find($id);
        $allSets = Auth::user()->workout_sets()->orderBy('created_at')->where('exercise_id', $exercise->id)->get();
        $allSets = $allSets->groupBy(function ($date) {
            return Carbon::parse($date->created_at)->format('y-m-d'); // grouping by date
        });
        $weight = [];
        foreach ($allSets as $set) {
            if ($set->first()['warmup'] == 0) {
                array_push($weight, array($set->first()['created_at'], $set->max('weight')));
            }
        }
        return(response()->json($weight));
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

        if ($validator->fails()) {
            return Redirect::to('exercise/edit')
           ->withErrors($validator);
        } else {
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
