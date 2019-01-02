<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExerciseMuscle extends Model
{
    protected $table = "exercise_muscle";
    protected $fillable = ["exercise_id", "muscle_id"];
    protected $hidden = ["created_at", "updated_at"];
}
