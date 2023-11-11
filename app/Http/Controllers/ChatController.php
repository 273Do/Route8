<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Library\Message;
use App\Events\MessageSent;
use App\Models\Post;

class ChatController extends Controller
{
    public function index()
    {
        return view('chat');
    }
    
    // メッセージ送信時の処理
    public function sendMessage( Request $request,Post $post )
    {
        // リクエストからデータの取り出し
        $input = $request->all();
        
        // メッセージオブジェクトの作成
        $message = new Message;
        $message -> user_id = $input['user_id'];
        $message -> user_name = $input['user_name'];
        $message -> post_id = $post->id;
        $message -> body = $input['body'];
        $message -> created_at = now();
       
        // 送信者を含めてメッセージを送信
        //event( new MessageSent( $message ) ); // Laravel V7までの書き方
        MessageSent::dispatch($message);    // Laravel V8以降の書き方
        
        // 送信者を除いて他者にメッセージを送信
        // Note : toOthersメソッドを呼び出すには、
        //        イベントでIlluminate\Broadcasting\InteractsWithSocketsトレイトをuseする必要がある。
        // broadcast( new MessageSent($message))->toOthers();
        
        //return ['message' => $strMessage];
        return ;
    }
}