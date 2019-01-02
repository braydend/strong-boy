<?php

use Faker\Generator as Faker;

$factory->define(App\Muscle::class, function (Faker $faker) {
    return [
        'name' => $faker->safeColorName
    ];
});
