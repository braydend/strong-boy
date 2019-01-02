<?php

use App\Muscle;
use Illuminate\Database\Seeder;

class MuscleSeeder extends Seeder
{
    private $muscles = [
        'Biceps',
        'Chest',
        'Quads',
        'Traps',
        'Triceps',
        'Shoulders',
        'Lats',
        'Hamstrings',
        'Glutes',
        'Forearms',
        'Calves',
        'Abdominals',
        'Lower back',
        'Traps (mid-back)'
    ];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->muscles as $muscle) {
            if(Muscle::where('name', $muscle)->first()){
                print ("'" . $muscle . "' ALREADY EXISTS\n");
                continue;
            }else {
                factory(App\Muscle::class)->create([
                    'name' => $muscle,
                ]);
                print ("'" . $muscle . "' CREATED\n");
            }
        }
    }
}
