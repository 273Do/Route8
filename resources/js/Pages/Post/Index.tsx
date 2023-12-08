import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";
import { Inertia } from "@inertiajs/inertia";
import TitleBar from "../../Layouts/TitleBar";
import Card from "./Card";
import SearchNotFound from "./SearchNotFound";
import ScrollRevealContainer from "../Common/ScrollRevealContainer";

// IndexPage
const Index = (props: Auth) => {
  const { posts, page_title, arrow, range, recommend_post_id, meta } = props;
  console.log(props);

  const loadData = (page: any) => {
    Inertia.get(route(route().current()), { page });
  };
  
  const renderPageNumbers = () => {
    const totalPages = posts.last_page;
    const currentPage = posts.current_page;

    let startPage = Math.max(1, currentPage - 4);
    let endPage = Math.min(totalPages, startPage + 9);

    if (totalPages > 10 && currentPage < 6) {
      endPage = 10;
    } else if (totalPages > 10 && currentPage >= totalPages - 4) {
      startPage = totalPages - 9;
    }

    return [...Array(endPage - startPage + 1).keys()].map((index) => {
      const page = startPage + index;
      return (
        <li key={page} onClick={() => loadData(page)}>
          <p>{page}</p>
        </li>
      );
    });
  };

  return (
    <Authenticated auth={props.auth} header={<h2>Index</h2>}>
      <div className="main_contents">
        <TitleBar
          page={"Route"}
          title={page_title}
          user_id={props.auth.user.id}
          arrow={arrow}
          range_value={range}
          recommend_post_id={recommend_post_id}
        />
        <ScrollRevealContainer>
          <div className="route_list">
            {posts == 0 ? (
              <>
                <SearchNotFound />
              </>
            ) : (
              <>
                {posts.data.map((post: Post) => (
                  <Card props={props} post={post} />
                ))}
                
                
                
                 {posts && (
        <div className="pagination">
          <ul>
            {/* 前のページへのボタン */}
            {posts.current_page > 1 && (
              <li onClick={() => loadData(posts.current_page - 1)}>
                <p>&lt;</p>
              </li>
            )}

            {/* ページ数の表示 */}
            {renderPageNumbers()}

            {/* 次のページへのボタン */}
            {posts.current_page < posts.last_page && (
              <li onClick={() => loadData(posts.current_page + 1)}>
                <p>&gt;</p>
              </li>
            )}
          </ul>
        </div>
      )}
             
              </>
            )}
          </div>
        </ScrollRevealContainer>
      </div>
    </Authenticated>
  );
};

export default Index;
