<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TestController extends Controller
{
    public function FakeExercises(){
      $exercises = factory(App\Exercise::class, 3)->create();
      return Redirect::to('/');
    }

    public function FakeSets(){
      $sets = factory(App\WorkoutSet::class, 3)->create();
      return Redirect::to('/');
    }
}
