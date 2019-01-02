<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TestAccountSeeder::class);
        $this->call(MuscleSeeder::class);
        $this->call(ExerciseSeeder::class);
    }
}
