<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkoutSet extends Model
{
    protected $table = 'workout_sets';
    protected $fillable = ['exercise_id', 'user_id', 'weight', 'reps', 'warmup'];
    protected $hidden = ['exercise_id', 'user_id', 'name', 'updated_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function exercise()
    {
        return $this->belongsTo('App\Exercise');
    }

    // override the toArray function (called by toJson)
    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();

        // assign the name
        if ($this->exercise_id) {
            $data['name'] = $this->exercise->name;
        } else {
            $data['name'] = null;
        }
        // change the date
        if ($this->created_at) {
            $data['date'] = $this->created_at->toFormattedDateString();
        } else {
            $data['date'] = null;
        }

        return $data;
    }
}
