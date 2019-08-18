<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Weight extends Model
{
    protected $table = 'weight';
    protected $fillable = ['weight', 'user_id'];
    protected $hidden = ['updated_at'];

    public function getUser()
    {
        return $this->hasOne('App\User');
    }
}
