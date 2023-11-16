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
    }
    public function destroy($post) {
        $user = \Auth::user();
        if ($user->is_bookmark($post)) {
            $user->bookmark_posts()->detach($post);
        }
    }
}
// ブックマークした記事の一覧を取得から->