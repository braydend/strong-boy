<?php

namespace App\Http\Controllers;
use App\Exercise;
use App\WorkoutSet;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TestController extends Controller
{
    public function FakeExercises(){
      $exercises = factory(Exercise::class, 3)->create();
      return Redirect::to('/');
    }

    public function FakeSets(){
      $sets = factory(WorkoutSet::class, 3)->create();
      return Redirect::to('/');
    }
}
