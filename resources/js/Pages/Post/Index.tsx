import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";
import TitleBar from "../../Layouts/TitleBar";
import Card from "./Card";

// IndexPage
const Index = (props: Auth) => {
  const { posts } = props;
  console.log(props);

  return (
    <Authenticated auth={props.auth} header={<h2>Index</h2>}>
      <div className="main_contents">
        <TitleBar page={"Route"} title={"Route"} edit={false} />
        <div className="route_list">
          {posts.map((post: Post) => (
            <Card props={props} post={post} />
          ))}
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
