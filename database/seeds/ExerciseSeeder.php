<?php

use App\Exercise;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    private $exercises = [
        'Bench Press',
        'Push Ups',
        'Bicep Curls',
        'Lat Pulldown',
        'Overhead Press',
        'Deadlift'
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->exercises as $exercise) {
            if(Exercise::where('name', $exercise)->first()){
                print ("'" . $exercise . "' ALREADY EXISTS\n");
                continue;
            }else {
                factory(App\Exercise::class)->create([
                    'name' => $exercise,
                ]);
                print ("'" . $exercise . "' CREATED\n");
            }
        }
    }
}
