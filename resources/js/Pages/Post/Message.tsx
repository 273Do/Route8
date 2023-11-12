import React from "react";
import { Post } from "../Types";

const Message = ({ messages }: { messages: Post }) => {
  console.log("message", messages);
  return (
    <div className="message_area">
      <div className="create_message"></div>
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
