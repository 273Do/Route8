<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post; 

class PostController extends Controller
{
    //HomePage
     public function index(Post $post)
    {
        // return Inertia::render("Post/Index");
         return Inertia::render("Post/Index",["posts" => $post->get()]);
    }
    
    //RoutePage
    public function show(Post $post)
    {
        return Inertia::render("Post/Show", ["post" => $post]);
    }
    
    //CreatePage
    public function create()
    {
        return Inertia::render("Post/Create"); 
    }
}
