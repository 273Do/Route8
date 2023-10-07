<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "title",
        "body",
        "is_public",
        "walk_available",
        "bicycle_available",
        "car_available",
        "bus_available",
        "train_available",
        "shinkansen_available",
        "plane_available",
        "ship_available",
    ];
}
