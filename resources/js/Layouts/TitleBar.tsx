import React, { useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { TitleBar } from "../Pages/Types";
import { LordIcon } from "../Pages/Common/lord-icon";
import { Inertia } from "@inertiajs/inertia";
import ScrollRevealContainer from "../Pages/Common/ScrollRevealContainer";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// HomePage
const TitleBar = ({ page, title, post_id, user_id, edit, arrow, range_value, bookmark, recommend_post_id }: TitleBar) => {
  const urlPrev = usePage().props.urlPrev as string;

  //console.log("URL:", urlPrev);
  //console.log(page, title, post_id, edit);

  const handleDeletePost = (id: number) => {
    withReactContent(Swal).fire({
      icon:"warning",
      background: "transparent",
      showCancelButton:true,
      confirmButtonColor:"#222",
      cancelButtonColor:"#222",
      title: 
      <>
      <h2 style={{color:"#f4ede4"}}>投稿を削除しますか？</h2>
      <p style={{color:"#f4ede4"}}>{title}</p>
      </>,
      footer:<p style={{color:"#f4ede4"}}>この動作は取り消せません</p>,
      preConfirm: () => {
        router.delete(`/posts/${id}`)
      },
    });
  };

  const [isBookmark, setIsBookmark] = useState<boolean>(
    page == "show" ? bookmark.some((item: { id: number }) => item.id === post_id) : false
  );

  const handleBookmark = (e: React.FormEvent<HTMLInputElement>, id: number) => {
    e.preventDefault();
    if (!isBookmark) Inertia.post(`/posts/${id}/bookmark`);
    else Inertia.delete(`/posts/${id}/unbookmark`);
    setIsBookmark(!isBookmark);
  };
  
  const [range, setRange] = useState<number>(title.indexOf('Recommend') != -1 ? range_value : 0);
  
  const handleMouseUp = () => {
    // console.log('Mouse up! Value:', range);
    if(recommend_post_id == "none") Inertia.get(`/posts/recommend/${range}`);
    else Inertia.get(`/posts/recommend/${recommend_post_id}/${range}`);
  };
  
  // const handleChangeRange = ()

  if (page == "Route") {
    return (
      <ScrollRevealContainer move="top">
        <div className="title_bar">
          <h1>{title}</h1>
          <nav>
            <ul>
              {/* <li className={`back_arrow ${arrow ? "" : "display_none"}`}>
              <Link href={urlPrev}>
                <LordIcon
                  src="https://cdn.lordicon.com/vduvxizq.json"
                  trigger="hover"
                  colors={{
                    primary: "#000",
                  }}
                  size={28}
                />
              </Link>
            </li> */}
              <li className={`range_bar ${title.indexOf('Recommend') != -1 ? "" : "display_none"}`}>
                <label htmlFor="range">{range}km</label>
                <input type="range" id="range" name="cowbell" min="2" max="20" value={range} onChange={(e) =>setRange(Number(e.target.value))} onMouseUp={() => handleMouseUp()}/>
              </li>
              <li className="create_icon">
                <Link href={route("create")}>
                  <LordIcon
                    src="https://cdn.lordicon.com/qtynovng.json"
                    trigger="hover"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              <li className={`${arrow || title == "Recommend" || title == "Bookmarks" ? "" : "display_none"}`}>
                {/* <Link href={urlPrev}> */}
                <Link href={"/posts"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/yymhadbu.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={28}
                  />
                </Link>
              </li>
              <li className={`${arrow ? "display_none" : ""}`}>
                <Link href={`/posts/user/${user_id}`}>
                  <LordIcon
                    src="https://cdn.lordicon.com/ziafkkwv.json"
                    trigger="hover"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              <li className={`${title == "Recommend" ? "display_none" : ""}`}>
                <Link href={"/posts/recommend/2"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/gboqysvk.json"
                    trigger="hover"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              <li className={`${title == "Bookmarks" ? "display_none" : ""}`}>
                <Link href={route("bookmarks")}>
                  <LordIcon
                    src="https://cdn.lordicon.com/prjooket.json"
                    trigger="morph"
                    state="morph-marked-bookmark"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              {/* <li>
              <NavLink href={route("index")} active={route().current("index")}>
                <LordIcon
                  src="https://cdn.lordicon.com/yxyampao.json"
                  trigger="hover"
                  colors={{ primary: "#000" }}
                  size={28}
                />
              </NavLink>
            </li> */}
            </ul>
          </nav>
        </div>
      </ScrollRevealContainer>
    );
  } else if (page == "show") {
    return (
      <ScrollRevealContainer move="top">
        <div className="title_bar">
          <h1>{title}</h1>
          <nav>
            <ul>
              {/* <li className="back_arrow">
              <Link href={urlPrev}>
                <LordIcon
                  src="https://cdn.lordicon.com/vduvxizq.json"
                  trigger="hover"
                  colors={{
                    primary: "#000",
                  }}
                  size={28}
                />
              </Link>
            </li> */}
              <li>
                {/* <Link href={urlPrev}> */}
                <Link href={"/posts"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/yymhadbu.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={28}
                  />
                </Link>
              </li>
              <li>
                <Link href={`/posts/user/${user_id}`}>
                  <LordIcon
                    src="https://cdn.lordicon.com/ziafkkwv.json"
                    trigger="hover"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              <li>
                <Link href={`/posts/recommend/${post_id}/2`}>
                  <LordIcon
                    src="https://cdn.lordicon.com/gboqysvk.json"
                    trigger="hover"
                    colors={{ primary: "#000" }}
                    size={28}
                  />
                </Link>
              </li>
              <li className={`${edit ? "" : "display_none"}`}>
                <Link href={`/posts/${post_id}/edit`}>
                  <LordIcon
                    src="https://cdn.lordicon.com/uwbjfiwe.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={28}
                  />
                </Link>
              </li>
              <li
                className={`${edit ? "" : "display_none"}`}
                onClick={() => handleDeletePost(post_id)}
              >
                <LordIcon
                  src="https://cdn.lordicon.com/wpyrrmcq.json"
                  trigger="morph"
                  state="morph-trash-full"
                  colors={{
                    primary: "#000",
                  }}
                  size={28}
                />
              </li>
              <li onClick={(e) => handleBookmark(e, post_id)}>
                <LordIcon
                  src="https://cdn.lordicon.com/prjooket.json"
                  trigger="morph"
                  state={`morph-${isBookmark ? "un" : ""}marked-bookmark`}
                  colors={{
                    primary: "#000",
                  }}
                  size={28}
                />
              </li>
            </ul>
          </nav>
        </div>
      </ScrollRevealContainer>
    );
  } else if (page == "create") {
    return (
      <ScrollRevealContainer move="top">
        <div className="title_bar">
          <h1>{title}</h1>
          <nav>
            <ul>
              <li className="back_arrow">
                <Link href={urlPrev}>
                  {/* <Link href="#" onClick={history.back()}> */}
                  <LordIcon
                    src="https://cdn.lordicon.com/vduvxizq.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={28}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </ScrollRevealContainer>
    );
  } else if (page == "edit") {
    return (
      <ScrollRevealContainer move="top">
        <div className="title_bar">
          <h1>{title}</h1>
          <nav>
            <ul>
              <li className="back_arrow">
                <Link href={urlPrev}>
                  {/* <Link href="#" onClick={history.back()}> */}
                  <LordIcon
                    src="https://cdn.lordicon.com/vduvxizq.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={28}
                  />
                </Link>
              </li>
              <li onClick={() => handleDeletePost(post_id)}>
                <LordIcon
                  src="https://cdn.lordicon.com/wpyrrmcq.json"
                  trigger="morph"
                  state="morph-trash-full"
                  colors={{
                    primary: "#000",
                  }}
                  size={28}
                />
              </li>
            </ul>
          </nav>
        </div>
      </ScrollRevealContainer>
    );
  }
};

export default TitleBar;
