<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Exercise extends Model
{
    protected $table = 'exercises';
    protected $fillable = ['name'];
    protected $hidden = ['created_at', 'updated_at'];

    public function workout_sets(){
        $user_id = Auth::user()->id;
        return $this->hasMany('App\WorkoutSet')->where('user_id', $user_id)->orderBy('created_at');
    }

    public function dashboard_workout_sets(){
        $user_id = Auth::user()->id;
        return $this
            ->hasMany('App\WorkoutSet')
            ->where('user_id', $user_id)
            ->where('warmup', 0)
            ->orderBy('created_at', 'desc')
            ->take(5);
    }

    public function workout_sets_by_reps(){
        $user_id = Auth::user()->id;
        return $this->hasMany('App\WorkoutSet')->where('user_id', $user_id)->orderBy('reps');
    }

    public function workout_sets_by_weight(){
        $user_id = Auth::user()->id;
        return $this->hasMany('App\WorkoutSet')->where('user_id', $user_id)->orderBy('weight');
    }

    // override the toArray function (called by toJson)
    public function toArray() {
        // get the original array to be displayed
        $data = parent::toArray();

        // change the value of name
        if ($this->id) {
            $data['name'] = $this->name;
        } else {
            $data['name'] = null;
        }

        return $data;
    }
}
