<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Category;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Situation;
use App\Models\Vehicle;
use App\Models\User;

class PostController extends Controller
{
    //HomePage
    public function index()
    {
        // return Inertia::render("Post/Index");
        //  return Inertia::render("Post/Index",["posts" => $post->get()]);
        return Inertia::render("Post/Index",["posts" => Post::with(["category", "vehicle", "situation",  "user"])->where("is_public", 1)->get()]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
        // ->where("is_public", 1)でis_publicが1(true)のもののみ返す．
    }
    
    //RoutePage
    public function show(Post $post)
    {
         // Eagerローディングを使って、Controller内でリレーション先のデータを紐付ける
        return Inertia::render("Post/Show", ["post" => $post->load(["category", "vehicle", "situation",  "user"])]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
    }
    
    //CreatePage
    public function create(Category $category)
    {
        return Inertia::render("Post/Create",["categories" => $category->get()]);
    }
    
    //Post
    public function store(PostRequest $request, Post $post, Situation $situation, Vehicle $vehicle)
    {


        //先にリレーション先を登録して，FKにリレーション先のIDを登録する．
        //postsが登録されるのは最後．
      
        $input = $request->all();
        //$requestにはリクエストパラメータが含まれており，
        //それを$inputに代入．

        //situations
        $situation -> start_point = $input["start_point"];
        $situation -> goal_point = $input["goal_point"];
        $situation -> weather_before_id = $input["weather_before_id"];
        $situation -> weather_after_id = $input["weather_after_id"];
        $situation -> is_running = $input["is_running"];
        $situation -> save();

        //vehicles
        $vehicle -> walk_available = $input["walk_available"];
        $vehicle -> bicycle_available = $input["bicycle_available"];
        $vehicle -> car_available = $input["car_available"];
        $vehicle -> bus_available = $input["bus_available"];
        $vehicle -> train_available = $input["train_available"];
        $vehicle -> shinkansen_available = $input["shinkansen_available"];
        $vehicle -> plane_available = $input["plane_available"];
        $vehicle -> ship_available = $input["ship_available"];
        $vehicle -> save();

        //posts
        $post -> title = $input["title"];
        $post -> body = $input["body"];
        $post -> is_public = $input["is_public"];
        $post -> map_url = $input["map_url"];

        $post -> user_id = $input["user_id"];
        $post -> situation_id = $situation -> id;
        $post -> vehicle_id = $vehicle -> id;
        $post -> category_id = $input["category_id"];
        $post -> save();

        // $post->fill($input)->save();
        //空のPostインスタンスにそれぞれのパラメータを全て挿入．
        //それを保存．
        return redirect("/posts/" . $post->id);
        //保存した投稿のidの表示を行う．
    }
    
    //EditPage
    public function edit(Post $post)
    {
        return Inertia::render("Post/Edit",  ["post" => $post->load(["category", "vehicle", "situation"])]);
    }
    
    //Update
    public function update(PostRequest $request, Post $post)
    {

        $input = $request->all();
        //$requestにはリクエストパラメータが含まれており，
        //それを$inputに代入．

        //situations
        $post -> situation -> start_point = $input["start_point"];
        $post -> situation -> goal_point = $input["goal_point"];
        $post -> situation -> weather_before_id = $input["weather_before_id"];
        $post -> situation -> weather_after_id = $input["weather_after_id"];
        $post -> situation -> is_running = $input["is_running"];
        $post -> situation -> save();

        //vehicles
        $post -> vehicle -> walk_available = $input["walk_available"];
        $post -> vehicle -> bicycle_available = $input["bicycle_available"];
        $post -> vehicle -> car_available = $input["car_available"];
        $post -> vehicle -> bus_available = $input["bus_available"];
        $post -> vehicle  -> train_available = $input["train_available"];
        $post -> vehicle -> shinkansen_available = $input["shinkansen_available"];
        $post -> vehicle -> plane_available = $input["plane_available"];
        $post -> vehicle -> ship_available = $input["ship_available"];
        $post -> vehicle -> save();

        //posts
        $post -> title = $input["title"];
        $post -> body = $input["body"];
        $post -> is_public = $input["is_public"];
        $post -> map_url = $input["map_url"];

        // $post -> user_id = $input["user_id"];
        // $post -> situation_id = $situation -> id;
        // $post -> vehicle_id = $vehicle -> id;
        $post -> save();

        // $input = $request->all();
        // $post->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }

    //Delete
    public function delete(Post $post, Situation $situation, Vehicle $vehicle)
    {
        $post -> situation() -> delete();
        $post -> vehicle() -> delete();
        $post -> delete();
        return redirect("/posts");
    }
}
