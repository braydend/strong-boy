<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $table = 'exercises';
    protected $fillable = ['name'];

    public function workout_sets(){
      return $this->hasMany('App\WorkoutSet');
    }
}
