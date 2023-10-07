<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
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
    
    //Post
    public function store(PostRequest $request, Post $post)
    {
        $input = $request->all();
        //$requestにはリクエストパラメータが含まれており，
        //それを$inputに代入．
        $post->fill($input)->save();
        //空のPostインスタンスにそれぞれのパラメータを全て挿入．
        //それを保存．
        return redirect("/posts/" . $post->id);
        //保存した投稿のidの表示を行う．
    }
}
