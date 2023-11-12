<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\User;

class MessageController extends Controller
{
    //SendMessage
    public function sendMessage(MessageRequest $request, Post $post, Message $message)
    {
        $input = $request->all();
        $message->fill($input)->save();
        return redirect("/posts/" . $post->id);
    }
}
