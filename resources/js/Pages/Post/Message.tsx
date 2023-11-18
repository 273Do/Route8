import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Auth, Post } from "../Types";
import ScrollRevealContainer from "../Common/ScrollRevealContainer";

const Message = ({
  props,
  post_data,
  messages,
}: {
  props: Auth;
  post_data: any;
  messages: Post;
}) => {
  const { data, setData, post } = useForm({
    user_id: props.user.id,
    post_id: post_data.id,
    body: "",
  });

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key !== "Enter" && data.body) {
      post(`/posts/${post_data.id}`);
      setData("body", "");
    } else {
      console.log("test");
    }
  };

  const FormattedDate = (date: string) => {
    const dateTime = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const dateFormatter = new Intl.DateTimeFormat("ja-JP", options);
    const formattedDate = dateFormatter.format(dateTime);
    return formattedDate;
  };

  return (
      <div className="message_area">
        <div className="chat_area">
          <>
            {messages.map((message: any) => (
              <div
                className={`message ${post_data.user.id == message.user.id ? "host_message" : ""}`}
              >
                <div className="message_header">
                  {/* <p>{message.id}</p>  
              <p>{message.post_id}</p> */}
                  <p>{message.user.name}</p>
                  <p>{FormattedDate(message.created_at)}</p>
                </div>
                <p className="message_body">{message.body}</p>
              </div>
            ))}
          </>
        </div>

        <form className="create_message" onSubmit={handleSendMessage}>
          <input
            type="textarea"
            className="input_message_area"
            placeholder="メッセージを送信"
            value={data.body}
            onChange={(e) => setData("body", e.target.value)}
          />
          {/* <button type="submit">送信</button> */}
        </form>
      </div>
  );
};

export default Message;
