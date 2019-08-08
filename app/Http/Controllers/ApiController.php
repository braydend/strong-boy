<?php

namespace App\Http\Controllers;

use App\Exercise;

class ApiController extends Controller
{
    public function getExercises()
    {
        return response()->json(Exercise::all());
    }
}
