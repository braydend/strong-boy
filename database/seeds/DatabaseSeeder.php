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
        // $this->call(UsersTableSeeder::class);
        //Create the test account if in dev environment
        if(getenv('APP_DEBUG')) {
            $this->call(TestAccountSeeder::class);
        }else{
            print ("YOU ARE IN A PRODUCTION ENVIRONMENT. IF YOU WISH TO CREATE A TEST ACCOUNT, YOU MUST DO SO IN THE APPLICATION");
        }
    }
}
