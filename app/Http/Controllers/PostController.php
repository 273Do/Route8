<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Category;
use App\Models\Message;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Situation;
use App\Models\Vehicle;
use App\Models\User;
use App\Library\Recommend;

class PostController extends Controller
{
    //HomePage
    public function index()
    {
        // return Inertia::render("Post/Index");
        //  return Inertia::render("Post/Index",["posts" => $post->get()]);
        return Inertia::render("Post/Index", ["posts" => Post::with(["category", "vehicle", "situation",  "user"])
        ->where("is_public", 1)->orderBy('created_at', 'desc')->get(),
        "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
        "page_title" => "Route",
        "arrow" => false]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
        // ->where("is_public", 1)でis_publicが1(true)のもののみ返す．
    }

    //Search
    public function search($search_mode, $word)
    {
        if(!empty($word)){
            if($search_mode == "title" || $search_mode == "body"){
                return Inertia::render("Post/Index", ["posts" => Post::with(["category", "vehicle", "situation",  "user"])
                ->where($search_mode, "like", "%".$word."%")->where("is_public", 1)->orderBy('created_at', 'desc')->get(), 
                "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
                "page_title" => "Search ".ucfirst($search_mode).":".$word, 
                "arrow" => true]);
                //  % を追加することで、指定したキーワードを含むすべてのレコードを取得．
            }else if($search_mode == "start" || $search_mode == "goal"){
                return Inertia::render("Post/Index", ["posts" => Post::with(["category", "vehicle", "situation",  "user"])
                -> whereHas("situation", function($query) use ($search_mode, $word){ $query -> where($search_mode."_point", "like", "%".$word."%");})
                ->where("is_public", 1)->orderBy('created_at', 'desc')->get(), 
                "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
                "page_title" => "Search ".ucfirst($search_mode).":".$word, 
                "arrow" => true]);
            }
        }
        else{
            return redirect("/posts");
        }
    }

    //filterUser
    public function filterUser(User $user)
    {
        return Inertia::render("Post/Index", ["posts" => Post::with(["category", "vehicle", "situation",  "user"])
        ->where("user_id", $user->id)->orderBy('created_at', 'desc')->get(),
        "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
        "page_title" => "User:".$user->name, "arrow" => true]);
        // userには指定したuser_idが入ってくる．暗黙の結合により，idに応じたUserテーブルから全てのデータを取ってくることができる．
    }

    //filterCategory
    public function filterCategory(Category $category)
    {
        return Inertia::render("Post/Index", ["posts" => Post::with(["category", "vehicle", "situation",  "user"])
        ->where("category_id", $category->id)->where("is_public", 1)->get(),
        "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
        "page_title" => "Category:".$category->category_name, "arrow" => true]);
    }

    //filterWeather
    public function filterWeather($situation, $weather)
    {
        return Inertia::render("Post/Index", [
            "posts" => Post::with(["category", "vehicle", "situation", "user"])
            ->whereHas('situation', function ($query) use ($situation, $weather) {$query->where("is_running", 1)->where("weather_".$situation."_id", $weather);})
            ->whereHas('category', function ($q) {$q->where("category_id", '<>', 2);})->where("is_public", 1)->get(), 
            "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
            "page_title" => ucfirst($situation)." Weather:".ucfirst($weather), 
            "arrow" => true]);
    }

    //filterVehicle
    public function filterVehicle($vehicle)
    {   $vehicle_available = $vehicle."_available";
        //whereHasはリレーション先のテーブルの条件で検索したいときに用いる．
        //whereHasの第一引数にはリレーションメソッド名(Postでのリレーションメソッド名)が入る．
        //第二引数には無名関数が入る．
        // $query はクエリビルダーを操作するために必要な変数です。Eloquentの whereHas メソッド内で使用されるクロージャは、クエリビルダーの操作を行うために $query という変数名を使うことが一般的です。
        // このように $query を使うことで、リレーション内のクエリを操作できます。Eloquentを使用する際に、関連付けられたモデルに対する条件を動的に指定する場合、$query を使用してサブクエリを構築することが一般的な方法です。
        // 例えば、$query->where($vehicle, true) の部分は、$vehicle パラメータに基づいて、リレーション内のカラムに対する条件を設定しています。そのため、$query を書かないと、クエリを操作する手段がなくなり、条件の指定ができなくなります。
        // したがって、$query を使用してクエリを操作することで、特定の条件に一致する投稿を正確に取得できます。このようなクエリの組み立ては、Eloquentを効果的に活用するために一般的な手法です。
        // $query->where($vehicle, true)：これはサブクエリ内でのクエリビルダーの操作です。具体的には、$vehicle パラメータの値（例: "walk_available"）をカラム名として指定し、そのカラムが true の場合に一致する投稿を取得する条件を設定しています。この部分は動的にカラム名を指定できるため、異なる車両タイプに対応する条件を設定する際に非常に便利です。
        return Inertia::render("Post/Index", [
            "posts" => Post::with(["category", "vehicle", "situation", "user"])
            ->whereHas('vehicle', function ($query) use ($vehicle_available) {$query->where($vehicle_available, true);})->where("is_public", 1)->get(),
            "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
            "page_title" => "Vehicle:".ucfirst($vehicle),
            "arrow" => true
        ]);
    }

    //BookmarkList
    public function bookmarkList()
    {
        return Inertia::render("Post/Index", ["posts" => \Auth::user()->bookmark_posts()->with(["category", "vehicle", "situation", "user"])->orderBy('created_at', 'desc')->get(),
        "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
        "page_title" => "Bookmarks",
        "arrow" => false]);
    }

    //RecommendPage
    public function recommendRoute($range)
    {
        // 基準のマップURLを格納
        $baseMapUrl = \Auth::user() -> posts() -> latest() -> value('map_url');

        // 結果を返す
        return $this->returnRecommend($baseMapUrl, $range, "none", "");
    }

    //RecommendExpansion
    function recommendExpansion(Post $post, $range)
    {
        $baseMapUrl = $post -> map_url;
        $baseMapTitle = ":".$post -> title;

        return $this->returnRecommend($baseMapUrl, $range, $post -> id, $baseMapTitle);

    }

    function returnRecommend($baseMapUrl, $range, $post_id, $baseMapTitle)
    {
         // すべての map_url を取得して配列に格納
        $allMapUrls = Post::where('map_url', '!=', $baseMapUrl)->pluck('map_url')->toArray();

        // 使用して最も近いマップのURLを取得
        $recommend = new Recommend();
        $closestMap = $recommend->recommend($baseMapUrl, $allMapUrls, $range);

        // 最も近いマップが存在する場合は、そのマップの URL を使って投稿を取得
        if (!empty($closestMap)) {

        //近い順位並び替える
        $posts = Post::with(["category", "vehicle", "situation", "user"])
         ->whereIn("map_url", $closestMap)
         ->where("is_public", 1)
        //  ->orderByRaw("FIELD(map_url, '" . implode("','", $closestMap) . "')")
         ->orderByRaw("ARRAY_POSITION(ARRAY['" . implode("','", $closestMap) . "'], map_url)")
         ->get();
        } else $posts = [];

        return Inertia::render("Post/Index", ["posts" => $posts,
        "bookmarks" => \Auth::user()->bookmark_posts()->orderBy('created_at', 'desc')->get(),
        "page_title" => "Recommend".$baseMapTitle,
        "arrow" => false,
        "range" => $range,
        "recommend_post_id" => $post_id]);
    }
    
    //RoutePage
    public function show(Post $post)
    {
         // Eagerローディングを使って、Controller内でリレーション先のデータを紐付ける
        return Inertia::render("Post/Show", [
            "post" => $post->load(["category", "vehicle", "situation",  "user"]),
            "bookmark" => \Auth::user()->bookmark_posts()->where("post_id", $post->id)->get(),
            "messages" => Message::with(["user", "post"])->where("post_id", $post->id)->get(),
        ]);
        // "category", "user"はPost.phpのリレーションの変数の名前を入れる．
    }
    
    //CreatePage
    public function create(Category $category)
    {
        return Inertia::render("Post/Create", ["categories" => $category->get()]);
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
        $post -> vehicle -> train_available = $input["train_available"];
        $post -> vehicle -> shinkansen_available = $input["shinkansen_available"];
        $post -> vehicle -> plane_available = $input["plane_available"];
        $post -> vehicle -> ship_available = $input["ship_available"];
        $post -> vehicle -> save();

        //posts
        $post -> title = $input["title"];
        $post -> body = $input["body"];
        $post -> is_public = $input["is_public"];
        $post -> map_url = $input["map_url"];

        //categories
        // $post -> category_id = $input["category_id"];

        // $post -> user_id = $input["user_id"];
        // $post -> situation_id = $situation -> id;
        // $post -> vehicle_id = $vehicle -> id;
        $post -> save();

        // $input = $request->all();
        // $post->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }

    //Delete
    public function delete(Post $post)
    {
        $post -> situation() -> delete();
        $post -> vehicle() -> delete();
        $post -> delete();
        return redirect("/posts");
    }
}
