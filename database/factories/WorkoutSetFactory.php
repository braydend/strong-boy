<?php

use Faker\Generator as Faker;
use Illuminate\Support\Facades\Auth;
use App\Exercise;
use Carbon\Carbon;

$factory->define(App\WorkoutSet::class, function (Faker $faker) {
  return [
      'exercise_id' => rand(1, Exercise::all()->count()),
      'user_id' => Auth::user()->id,
      'weight' => $faker->randomFloat(2, 0, 100),
      'reps' => $faker->randomDigitNotNull(),
      'created_at' => Carbon::now()->subDays(rand(0,100)),
  ];
});
