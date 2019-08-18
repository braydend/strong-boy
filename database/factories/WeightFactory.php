<?php

use App\User;
use App\Weight;
use Faker\Generator as Faker;

$factory->define(Weight::class, function (Faker $faker) {
    return [
        'weight' => $faker->numberBetween(70, 100),
        'user_id' => $faker->numberBetween(0, User::all()->count()),
    ];
});
