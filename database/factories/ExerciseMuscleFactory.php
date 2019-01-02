<?php

use App\Exercise;
use App\ExerciseMuscle;
use App\Muscle;
use Faker\Generator as Faker;

$factory->define(ExerciseMuscle::class, function (Faker $faker) {
    return [
        'exercise_id' => rand(0, count(Exercise::all())),
        'muscle_id' => rand(0, count(Muscle::all())),
    ];
});
