<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class BookmarkController extends Controller
{
    //
     public function store($post) {
        $user = \Auth::user();
        if (!$user->is_bookmark($post)) {
            $user->bookmark_posts()->attach($post);
        }
        // return Redirect::back();
        // return back();
    }
    public function destroy($post) {
        $user = \Auth::user();
        if ($user->is_bookmark($post)) {
            $user->bookmark_posts()->detach($post);
        }
        // return back();
    }
}
// ブックマークした記事の一覧を取得から->