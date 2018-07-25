<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkoutSet extends Model
{
  protected $table = 'workout_sets';
  protected $fillable = ['exercise_id', 'user_id', 'weight', 'reps', 'warmup'];

  public function user(){
    return $this->belongsTo('App\User');
  }

  public function exercise(){
    return $this->belongsTo('App\Exercise');
  }
}
