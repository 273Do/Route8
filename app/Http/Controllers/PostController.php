<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\User;

class PostController extends Controller
{
    //HomePage
     public function index()
    {
        // return Inertia::render("Post/Index");
        //  return Inertia::render("Post/Index",["posts" => $post->get()]);
        return Inertia::render("Post/Index",["posts" => Post::with(["category", "user"])->get()]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
        }
    
    //RoutePage
    public function show(Post $post)
    {
         // Eagerローディングを使って、Controller内でリレーション先のデータを紐付ける
        return Inertia::render("Post/Show", ["post" => $post->load(["category", "user"])]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
    }
    
    //CreatePage
    public function create(Category $category)
    {
        return Inertia::render("Post/Create",["categories" => $category->get()]);
    }
    
    //Post
    public function store(PostRequest $request, Post $post)
    {


        //先にリレーション先を登録して，FKにリレーション先のIDを登録する．
        //postsが登録されるのは最後．


        $input = $request->all();
        //$requestにはリクエストパラメータが含まれており，
        //それを$inputに代入．
        $post->fill($input)->save();
        //空のPostインスタンスにそれぞれのパラメータを全て挿入．
        //それを保存．
        return redirect("/posts/" . $post->id);
        //保存した投稿のidの表示を行う．
    }
    
    //EditPage
    public function edit(Post $post)
    {
        return Inertia::render("Post/Edit", ["post" => $post]);
    }
    
    //Update
    public function update(PostRequest $request, Post $post)
    {
        $input = $request->all();
        $post->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }

    //Delete
    public function delete(Post $post)
    {
        $post->delete();
        return redirect("/posts");
    }
}
