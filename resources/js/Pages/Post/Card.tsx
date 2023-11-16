import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";
import { Link, useForm } from "@inertiajs/inertia-react";
import { LordIcon } from "../Common/lord-icon";
import { Inertia } from "@inertiajs/inertia";

const Card = ({ props, post }: { props: Auth; post: Post }) => {
  const handleDeletePost = (id: number) => {
    router.delete(`/posts/${id}`, {
      onBefore: () => confirm("本当に削除しますか？"),
    });
  };

  const putWeatherState = (weather: string): string => {
    let url: string = "";
    if (weather == "sunny") url = "https://cdn.lordicon.com/ingirgpt.json";
    else if (weather == "cloudy") url = "https://cdn.lordicon.com/zawvkqfy.json";
    else if (weather == "rainy") url = "https://cdn.lordicon.com/jtslwgho.json";
    else if (weather == "snowy") url = "https://cdn.lordicon.com/sjtzcwfd.json";
    return url;
  };

  const [bookmark, setBookmark] = useState<boolean>(
    props.bookmarks.some((bookmark: { id: number }) => bookmark.id === post.id)
  );

  const handleBookmark = (e: React.FormEvent<HTMLInputElement>, id: number) => {
    e.preventDefault();
    if (!bookmark) Inertia.post(`/posts/${id}/bookmark`);
    else Inertia.delete(`/posts/${id}/unbookmark`);
    setBookmark(!bookmark);
  };

  return (
    <div className="route_board" key={post.id}>
      <Link className="link_no_underline" href={`/posts/${post.id}`}>
        <div
          className={`route_card ${
            props.auth.user.id !== post.user.id && post.is_public == false
              ? "display_none"
              : post.is_public == false
              ? "isnot_public"
              : ""
          }`}
        >
          <div className="route_header">
            <p>
              {post.situation.start_point} → {post.situation.goal_point}
            </p>
            <ul>
              <li className={`${props.auth.user.id == post.user.id ? "" : "display_none"}`}>
                <Link href={`/posts/${post.id}/edit`}>
                  <LordIcon
                    src="https://cdn.lordicon.com/uwbjfiwe.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li
                className={`${props.auth.user.id == post.user.id ? "" : "display_none"}`}
                onClick={() => handleDeletePost(post.id)}
              >
                <LordIcon
                  src="https://cdn.lordicon.com/wpyrrmcq.json"
                  trigger="morph"
                  state="morph-trash-full"
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
              </li>
              <li onClick={(e) => handleBookmark(e, post.id)}>
                <LordIcon
                  src="https://cdn.lordicon.com/prjooket.json"
                  trigger="morph"
                  state={`morph-${bookmark ? "un" : ""}marked-bookmark`}
                  colors={{
                    primary: "#000",
                  }}
                  size={25}
                />
              </li>
            </ul>
          </div>
          <iframe
            src={post.map_url}
            width="480"
            height="260"
            allowFullScreen
            loading="lazy"
            frameborder="0"
          ></iframe>
          <div className="route_footer">
            {post.situation.is_running == 1 ? (
              <>
                <ul className="route_weather">
                  {post.category.category_name == "Facility" ? (
                    <>
                      <li>
                        <Link href={`/posts/category/${post.category.id}`}>
                          <LordIcon
                            src="https://cdn.lordicon.com/pfdotuzr.json"
                            trigger="hover"
                            stroke="bold"
                            colors={{
                              primary: "#000",
                              secondary: "#000",
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li
                        className={`${
                          post.category.category_name == "Route" ? "" : "display_none"
                        }`}
                      >
                        <Link href={`/posts/category/${post.category.id}`}>
                          <LordIcon
                            src="https://cdn.lordicon.com/rxtfetez.json"
                            trigger="hover"
                            stroke="bold"
                            colors={{
                              primary: "#000",
                              secondary: "#000",
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                      <li
                        className={`${
                          post.category.category_name == "Scenery" ? "" : "display_none"
                        }`}
                      >
                        <Link href={`/posts/category/${post.category.id}`}>
                          <LordIcon
                            src="https://cdn.lordicon.com/esrfxuri.json"
                            trigger="hover"
                            stroke="bold"
                            colors={{
                              primary: "#000",
                              secondary: "#000",
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href={`/posts/weather/before/${post.situation.weather_before_id}`}>
                          <LordIcon
                            src={putWeatherState(post.situation.weather_before_id)}
                            trigger="hover"
                            stroke="bold"
                            colors={{
                              primary: "#000",
                              secondary: "#000",
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link href={`/posts/weather/after/${post.situation.weather_after_id}`}>
                          <LordIcon
                            src={putWeatherState(post.situation.weather_after_id)}
                            trigger="hover"
                            stroke="bold"
                            colors={{
                              primary: "#000",
                              secondary: "#000",
                            }}
                            size={25}
                          />
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </>
            ) : (
              <>
                <ul className="isnot_running">
                  <li>
                    <LordIcon
                      src="https://cdn.lordicon.com/muyjobwf.json"
                      trigger="hover"
                      colors={{
                        primary: "#000",
                        secondary: "#000",
                      }}
                      size={25}
                    />
                  </li>
                </ul>
              </>
            )}
            <ul className="route_vehicle">
              <li className={`${post.vehicle.walk_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/walk"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/oxbjzlrk.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.bicycle_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/bicycle"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/mknljqhi.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.car_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/car"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/cqjfxkgf.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.bus_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/bus"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/yiothpas.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.train_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/train"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/eomzkbrc.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.shinkansen_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/shinkansen"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/dpwabcjy.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.plane_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/plane"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/rpcdmsys.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
              <li className={`${post.vehicle.ship_available == 0 ? "display_none" : ""}`}>
                <Link href={"/posts/vehicle/ship"}>
                  <LordIcon
                    src="https://cdn.lordicon.com/pgofwoue.json"
                    trigger="hover"
                    colors={{
                      primary: "#000",
                      secondary: "#000",
                    }}
                    size={25}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Link>
      <p
        className={`card_title ${
          props.auth.user.id !== post.user.id && post.is_public == false ? "display_none" : ""
        }`}
      >
        {post.title}
      </p>
    </div>
  );
};

export default Card;
