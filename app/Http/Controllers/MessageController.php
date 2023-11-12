<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Requests\MessageRequest;

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
