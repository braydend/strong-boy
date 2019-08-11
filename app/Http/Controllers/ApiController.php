<?php

namespace App\Http\Controllers;

use App\Exercise;
use App\WorkoutSet;
use Illuminate\Http\Request;
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

	public function addSet(Request $request)
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
		$set = new WorkoutSet;
		$set->user_id = $user->id;
		$set->exercise_id = $request->request->get('exercise_id');
		$set->weight = $weight;
		$set->reps = $request->request->get('reps');
		$set->warmup = $request->request->get('warmup');
		$set->created_at = $request->request->get('date');
		$set->save();
	}
}
