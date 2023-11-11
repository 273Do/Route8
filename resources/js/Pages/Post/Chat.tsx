import React, { useState, useEffect } from "react";
import Echo from "laravel-echo";
import { useForm } from "@inertiajs/inertia-react";
import { Post, Auth } from "../Types";

const Chat = ({ post_data, user_data }: { post_data: Post; user_data: any }) => {
  const [ message, setMessage ] = useState<any>([]);
  const { data, setData, post } = useForm({
    user_id: user_data.user.id,
    user_name: user_data.user.name,
    body: "",
  });

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    post(`/posts/${post_data.id}`);
    // try {
    //   // JSONデータをAPIにPOST
    //   const response = await fetch("", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const responseData = await response.json();
    //   // 成功時の処理
    //   console.log(responseData);
    // } catch (error) {
    //   // エラー時の処理
    //   console.error(error);
    // }
  };

  useEffect(() => {
    // Echoインスタンスの初期化
    const echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
      forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? "https") === "https",
      encrypted: true,
    });

    // チャンネルの購読
    const channel = echo.channel("chat");

    // イベントのリッスン
    channel.listen("MessageSent", (e: any) => {
      // メッセージが送信されたときの処理
      console.log("New message:", e);
      setMessage(e);
    });

    // コンポーネントがアンマウントされたときに購読を解除
    return () => {
      channel.stopListening("MessageSent");
    };
  }, []);

  return (
    <div className="chat_area">
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="メッセージを入力"
          onChange={(e) => setData("body", e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
     {message.map((item: any) => (
        <><p>user_id:{item.user_id}</p><p>user_name:{item.user_name}</p><p>post_id:{item.post_id}</p><p>body:{item.body}</p><p>created_at:{item.created_at}</p></>
      ))}
    </div>
  );
};

export default Chat;
