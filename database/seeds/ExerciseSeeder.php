<?php

use App\Exercise;
use App\ExerciseMuscle;
use App\Muscle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    // Exercise names and muscles
    // Use the format [<Name>. [<Muscle Used>, <Muscle Used>, ...]]
    private $exercises = [
        ['Bench Press', [1]],
        ['Push Ups', [1, 2, 6]],
        ['Bicep Curls', [1]],
        ['Lat Pulldown', [7]],
        ['Overhead Press',  [6]],
        ['Deadlift', [3, 5, 8 ,9 ,11, 12, 13, 14]]
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Clear muscle mapping
        print ("MUSCLE MAPPING CLEARED");
        ExerciseMuscle::truncate();
        foreach ($this->exercises as $exercise) {
            if(Exercise::where('name', $exercise[0])->first()){
                print ("'" . $exercise[0] . "' ALREADY EXISTS\n");
            }else {
                factory(App\Exercise::class)->create([
                    'name' => $exercise[0],
                ]);
                print ("'" . $exercise[0] . "' CREATED\n");
            }
            $this->mapMuscles($exercise);
        }
    }

    public function mapMuscles($exerciseData){
        $exercise = Exercise::where('name', $exerciseData[0])->first();
        foreach ($exerciseData[1] as $muscleId){
            $muscle = Muscle::find($muscleId);
            if(ExerciseMuscle::where('exercise_id', $exercise->id)->where('muscle_id', $muscle->id)->get()->isNotEmpty()){
                print("A MAPPING BETWEEN '" . $exercise->name . "' AND '" . $muscle->name ."' ALREADY EXISTS\n");
            }else{
                $exerciseMuscle = new ExerciseMuscle;
                $exerciseMuscle->exercise_id = $exercise->id;
                $exerciseMuscle->muscle_id = $muscle->id;
                $exerciseMuscle->save();
                print ("'" . $muscle->name . "' MAPPED TO '" . $exercise->name . "\n");
            }
        }
    }
}
