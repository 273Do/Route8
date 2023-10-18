<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Situation extends Model
{
    use HasFactory;

    protected $fillable = [
        "start_point",
        "goal_point",
        "weather_before_id",
        "weather_after_id",
        "is_running",
    ];

    public function post()   
    {

        return $this->hasOne(Post::class);  

    }
}
