<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkoutSet extends Model
{
  protected $table = 'workout_sets';
  protected $fillable = ['exercise_id', 'user_id', 'weight', 'reps'];

  public function user(){
    return $this->hasOne('App\User');
  }

  public function exercise(){
    return $this->hasOne('App\Exercise');
  }
}
