<?php

namespace App\Http\Controllers;

use App\Exercise;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

class ApiController extends Controller
{
    public function getExercises()
    {
        return response()->json(Exercise::all());
    }

    public function addExercise()
    {
        $exercise = new Exercise;
        $exercise->name = Input::get('name');
        $exercise->save();
    }

    public function getSets($id)
    {
        $exercise = Exercise::find($id);
        $allSets = Auth::user()->workout_sets()->orderBy('created_at')->where('exercise_id', $exercise->id)->get();
        return(response()->json($allSets));
    }

    public function getSetsForDashboard($id)
    {
        $exercise = Exercise::find($id);
        return response()->json($exercise->dashboard_workout_sets);
    }
}
