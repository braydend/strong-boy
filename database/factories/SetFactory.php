<?php

use Faker\Generator as Faker;

$factory->define(Model::class, function (Faker $faker) {
  return [
      'exercise_id' => '1',
      'user_id' => '1',
      'weight' => $faker->randomFloat(2, 0, 100),
      'reps' => $faker->randomDigitNotNull(),
  ];
});
