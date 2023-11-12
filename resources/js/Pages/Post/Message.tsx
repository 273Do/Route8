import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Auth, Post } from "../Types";

const Message = ({
  props,
  post_id,
  messages,
}: {
  props: Auth;
  post_id: string;
  messages: Post;
}) => {
  const { data, setData, post } = useForm({
    user_id: props.user.id,
    post_id: post_id,
    body: "",
  });
  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key !== "Enter" && data.body) post(`/posts/${post_id}`);
    else {
      console.log("test");
    }
  };

  return (
    <div className="message_area">
      <div className="create_message">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="メッセージを送信"
            onChange={(e) => setData("body", e.target.value)}
          />
          <button type="submit">送信</button>
        </form>
      </div>
      <>
        {messages.map((message: any) => (
          <div>
            <p>{message.id}</p>
            <p>{message.user.name}</p>
            <p>{message.post_id}</p>
            <p>{message.body}</p>
            <p>{message.created_at}</p>
          </div>
        ))}
      </>
    </div>
  );
};

export default Message;
