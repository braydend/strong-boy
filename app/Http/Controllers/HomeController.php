<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exercise;
use App\WorkoutSet;
use Carbon\Carbon;
use Session;
use Auth;

class HomeController extends Controller
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
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get 6 most recent exercises per page
        $user = Auth::user();
        //$exercises = Exercise::latest()->get();
        $message = null;
        $diff = 0;

        //get all sets for user latest -> oldest
        $sets = Auth::user()->workout_sets()->orderBy('created_at', 'desc')->get();
        //printf("Sets:" . $sets);

        //group by exercise
        $exercises = $sets->groupBy('exercise_id');
        // echo("Exercies:");
        // foreach ($exercises as $exercise) {
        //   printf($exercise);
        //   echo("<hr />");
        // }


        //Check time since last logged set
        if($user->workout_sets()->count() > 0){
          $last_set = $user->workout_sets()->orderBy('created_at', 'desc')->first();
          $last_set = $last_set->created_at;
          $now = Carbon::now();
          $diff = $now->diffInDays($last_set);
        }
        //store time since in object
        // foreach($sets as $set){
        //   $set['days_since'] = $set->created_at->diffForHumans();
        // }
        //set alerts for 1 week, 1 month
        if($diff > 62){
          $message = "Look I know I was a bit rude, but seriously, get back to the gym. You'll feel great I promise!";
        }else if($diff > 31){
          $message = "Seriously?!?! It's been over a month. Get your fat fucking ass back in the gym!";
        }else if($diff > 7){
          $message = "You haven't logged a set in over a week! Don't be a pussy, get back in the gym!";
        }
        return view('home')
          ->with('exercises', $exercises)
          ->with('message', $message)
          ->with('user', $user);
    }

    public function indexData()
    {
        $exercises = Exercise::all();
        foreach ($exercises as $exercise) {
            $exercise->dashboard_workout_sets;
        }
        return response()->json($exercises);
    }
}
