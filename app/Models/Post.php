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
        "map_url",
        "user_id",
        "situation_id",
        "vehicle_id",
        "category_id",
    ];


    public function user()
    {

        return $this->belongsTo(User::class);

    }

    public function category()
    {

        return $this->belongsTo(Category::class);

    }

    public function vehicle()
    {

        return $this->belongsTo(Vehicle::class);

    }

    public function situation()
    {

        return $this->belongsTo(Situation::class);

    }
}
