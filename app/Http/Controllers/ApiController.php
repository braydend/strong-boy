<?php

namespace App\Http\Controllers;

use App\Exercise;
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
}
