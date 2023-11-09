import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";
import TitleBar from "../../Layouts/TitleBar";
import Card from "./Card";
import SearchNotFound from "./SearchNotFound";

// IndexPage
const Index = (props: Auth) => {
  const { posts, page_title, arrow } = props;
  console.log(props);
  console.log(page_title);
  console.log("テーマ", props.auth.user.dark_theme_enabled);

  return (
    <Authenticated auth={props.auth} header={<h2>Index</h2>}>
      <div className="main_contents">
        <TitleBar page={"Route"} title={page_title} user_id={props.auth.user.id} arrow={arrow} />
        <div className="route_list">
          {posts == 0 ? (
            <>
              <SearchNotFound />
            </>
          ) : (
            <>
              {posts.map((post: Post) => (
                <Card props={props} post={post} />
              ))}
            </>
          )}
        </div>
      </div>
    </Authenticated>
  );
};

export default Index;
