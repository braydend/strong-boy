<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TestAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if(getenv('APP_DEBUG')) {
            $exists = false;
            foreach (User::all() as $user){
                if ($user->email == 'test@email.com'){
                    $exists = true;
                }
            }
            if(!$exists) {
                DB::table('users')->insert([
                    'name' => 'Test',
                    'email' => 'test@email.com',
                    'password' => bcrypt('testpass'),
                ]);
                print ("TEST ACCOUNT CREATED\n");
            }else{
                print ("TEST ACCOUNT ALREADY ACTIVE\n");
            }
        }else{
            print ("YOU ARE IN A PRODUCTION ENVIRONMENT. IF YOU WISH TO CREATE A TEST ACCOUNT, YOU MUST DO SO IN THE APPLICATION");
        }
    }
}
