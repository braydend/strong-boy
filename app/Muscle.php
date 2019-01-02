<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Muscle extends Model
{
    protected $table = 'muscles';
    protected $fillable = ['name', 'desc'];
    protected $hidden = ['created_at', 'updated_at'];

    public function exercises(){
        return $this->belongsToMany('App\Exercise');
    }
}
