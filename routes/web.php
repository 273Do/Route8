<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(["middleware" => ["auth"]], function() {

//    Route::get("/posts", function() {
//        return Inertia::render("Post/Index");
//    }) ;

    Route::get('/previous-page', [PageController::class, 'previousPage'])->name('previous.page');

    //HomePage
    Route::get("/posts", [PostController::class, "index"])->name("index");
    
    //CreatePage
    Route::get("/posts/create", [PostController::class, "create"])->name("create");
    
    //Post
    Route::post("/posts",[PostController::class, "store"]);
    
    //RoutePage
    Route::get("/posts/{post}", [PostController::class, "show"]);

    //Search
    Route::get("/posts/search/{search_mode}/{word}", [PostController::class, "search"]);

    //filterUser
    Route::get("/posts/user/{user}", [PostController::class, "filterUser"]);

    //filterCategory
    Route::get("/posts/category/{category}", [PostController::class, "filterCategory"]);
    
    //filterWeather
    Route::get("/posts/weather/{situation}/{weather}", [PostController::class, "filterWeather"]);

    //filterVehicle
    Route::get("/posts/vehicle/{vehicle}", [PostController::class, "filterVehicle"]);
    
    //EditPage
    Route::get("/posts/{post}/edit", [PostController::class, "edit"]);
    
    //Update
    Route::put("/posts/{post}", [PostController::class, "update"]);

    //Delete
    Route::delete("/posts/{post}", [PostController::class, "delete"]);

    //DarkTheme
    Route::put("/{user}/dark_theme", [ProfileController::class, "darkTheme"]);
    
    //MapEffect
    Route::put("/{user}/map_effect", [ProfileController::class, "mapEffect"]);

    //SendMessage
    Route::post("/posts/{post}", [MessageController::class, "sendMessage"]);

});

require __DIR__.'/auth.php';
