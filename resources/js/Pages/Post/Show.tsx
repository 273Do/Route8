import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import { Post } from "../Types";
import { LordIcon } from "../Common/lord-icon";
import TitleBar from "../../Layouts/TitleBar";

// RoutePage
const Show = (props: Post) => {
  const { post } = props;
  console.log(props.auth);
  console.log(post);

  const FormattedDate = (date: string) => {
    const dateTime = new Date(date);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateFormatter = new Intl.DateTimeFormat("ja-JP", options);
    const formattedDate = dateFormatter.format(dateTime);
    return formattedDate;
  };

  const putWeatherState = (weather: string): string => {
    let url: string = "";
    if (weather == "sunny") url = "https://cdn.lordicon.com/ingirgpt.json";
    else if (weather == "cloudy") url = "https://cdn.lordicon.com/zawvkqfy.json";
    else if (weather == "rainy") url = "https://cdn.lordicon.com/jtslwgho.json";
    else if (weather == "snowy") url = "https://cdn.lordicon.com/sjtzcwfd.json";
    return url;
  };

  return (
    <Authenticated auth={props.auth} header={<h2>Index</h2>}>
      <div className="main_contents">
        <TitleBar
          page={"show"}
          title={post.title}
          post_id={post.id}
          user_id={props.auth.user.id}
          edit={props.auth.user.id == post.user.id ? true : false}
        />
        <div className="route_page">
          <iframe
            src={post.map_url}
            width="480"
            height="260"
            allowFullScreen
            loading="lazy"
            frameborder="0"
          ></iframe>
          <div className="route_detail">
            <div className="route_explanation">
              <div className="explanation_header">
                <p> {FormattedDate(post.created_at)}</p>
                {/* <Link href={`/posts/user/${post.user.id}`} className="link_no_underline">
                  <p>{post.user.name}</p>
                </Link> */}
                <Link href={`/posts/user/${post.user.id}`} className="link_no_underline">
                  <div className="user_button">
                    <LordIcon
                      src="https://cdn.lordicon.com/kthelypq.json"
                      trigger="hover"
                      colors={{ primary: "#222222" }}
                      size={23}
                    />
                    <p>{post.user.name}</p>
                  </div>
                </Link>
              </div>

              <div className="explanation_start_goal">
                <p>
                  {post.situation.start_point} → {post.situation.goal_point}
                </p>
              </div>

              <p className="body">{post.body}</p>

              <div className="route_state">
                {post.situation.is_running == 1 ? (
                  <>
                    <div>
                      <ul className="route_weather">
                        {post.category.category_name == "Facility" ? (
                          <>
                            <li>
                              <Link href={`/posts/category/${post.category.id}`}>
                                <LordIcon
                                  src="https://cdn.lordicon.com/pfdotuzr.json"
                                  trigger="hover"
                                  colors={{
                                    primary: "#222222",
                                    secondary: "#222222",
                                  }}
                                  size={52}
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
                                    primary: "#222222",
                                    secondary: "#222222",
                                  }}
                                  size={52}
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
                                    primary: "#222222",
                                    secondary: "#222222",
                                  }}
                                  size={52}
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`/posts/weather/before/${post.situation.weather_before_id}`}
                              >
                                <LordIcon
                                  src={putWeatherState(post.situation.weather_before_id)}
                                  trigger="hover"
                                  stroke="bold"
                                  colors={{
                                    primary: "#222222",
                                    secondary: "#222222",
                                  }}
                                  size={52}
                                />
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`/posts/weather/after/${post.situation.weather_after_id}`}
                              >
                                <LordIcon
                                  src={putWeatherState(post.situation.weather_after_id)}
                                  trigger="hover"
                                  stroke="bold"
                                  colors={{
                                    primary: "#222222",
                                    secondary: "#222222",
                                  }}
                                  size={52}
                                />
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div></div>
                  </>
                ) : (
                  <>
                    <ul className="isnot_running">
                      <li>
                        <LordIcon
                          src="https://cdn.lordicon.com/muyjobwf.json"
                          trigger="hover"
                          colors={{
                            primary: "#222222",
                            secondary: "#222222",
                          }}
                          size={52}
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.bicycle_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/bicycle"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/mknljqhi.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.car_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/car"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/cqjfxkgf.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.bus_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/bus"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/yiothpas.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.train_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/train"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/eomzkbrc.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.shinkansen_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/shinkansen"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/dpwabcjy.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.plane_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/plane"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/rpcdmsys.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                  <li className={`${post.vehicle.ship_available == 0 ? "display_none" : ""}`}>
                    <Link href={"/posts/vehicle/ship"}>
                      <LordIcon
                        src="https://cdn.lordicon.com/pgofwoue.json"
                        trigger="hover"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </Link>
                  </li>
                </ul>
                {/* <p>{post.situation.is_running}</p> */}
              </div>
            </div>
            <div className="chat_area"></div>
          </div>
        </div>
      </div>
      {/* <div>
                <h1>{post.title}</h1>

                <div>
                    <h3>本文</h3>
                    <p>{post.body}</p>
                    <p>{post.is_public}</p>
                    <p>{post.created_at}</p>
                    <p>{post.map_url}</p>
                    <p>{post.category.category_name}</p>
                    <p>{post.user.name}</p>

                    <p>{post.situation.start_point}</p>
                    <p>{post.situation.goal_point}</p>
                    <p>{post.situation.weather_before_id}</p>
                    <p>{post.situation.weather_after_id}</p>
                    <p>{post.situation.is_running}</p>

                    <p>{post.vehicle.walk_available}</p>
                    <p>{post.vehicle.bicycle_available}</p>
                    <p>{post.vehicle.car_available}</p>
                    <p>{post.vehicle.bus_available}</p>
                    <p>{post.vehicle.train_available}</p>
                    <p>{post.vehicle.shinkansen_available}</p>
                    <p>{post.vehicle.plane_available}</p>
                    <p>{post.vehicle.ship_available}</p>

                    <div>
                        <Link href={`/posts/${post.id}/edit`}>編集</Link>
                    </div>
                </div>

                <div>
                    <Link href="/posts">戻る</Link>
                </div>
            </div> */}
    </Authenticated>
  );
};

export default Show;
