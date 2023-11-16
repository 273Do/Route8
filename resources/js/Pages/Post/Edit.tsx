import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Post } from "../Types";
import { LordIcon } from "../Common/lord-icon";
import TitleBar from "../../Layouts/TitleBar";

const Edit = (props: Post) => {
  const { post } = props;
  console.log(post);
  const { data, setData, put } = useForm({
    // 投稿
    title: post.title,
    body: post.body,
    is_public: post.is_public,
    map_url: post.map_url,

    // 移動手段
    walk_available: post.vehicle.walk_available,
    bicycle_available: post.vehicle.bicycle_available,
    car_available: post.vehicle.car_available,
    bus_available: post.vehicle.bus_available,
    train_available: post.vehicle.train_available,
    shinkansen_available: post.vehicle.shinkansen_available,
    plane_available: post.vehicle.plane_available,
    ship_available: post.vehicle.ship_available,

    // 状態
    start_point: post.situation.start_point,
    goal_point: post.situation.goal_point,
    weather_before_id: post.situation.weather_before_id,
    weather_after_id: post.situation.weather_after_id,
    is_running: post.situation.is_running,

    // カテゴリー
    // category_id: post.category.category_name,
    // user_id: props.auth.user.id,
  });

  const extractGoogleMapsSrc = (iframeSrc: string): string => {
    // 正規表現を使用して src 属性の値を抜き出す
    const srcRegex = /src="([^"]+)"/;
    const matches = iframeSrc.match(srcRegex);

    if (matches && matches.length > 1 && matches[1].startsWith("https://www.google.com/maps/")) {
      // マッチした部分が条件を満たす場合にのみ返す
      return matches[1];
    } else {
      return "";
    }
  };

  const handleCheckboxClick = (checkboxName: string) => {
    // チェックボックスの状態を反転させるロジック
    setData((prevData: any) => ({
      ...prevData,
      [checkboxName]: !prevData[checkboxName],
    }));
  };

  const handleSendPosts = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      e.key !== "Enter" &&
      (data.walk_available ||
        data.bicycle_available ||
        data.car_available ||
        data.bus_available ||
        data.train_available ||
        data.shinkansen_available ||
        data.plane_available ||
        data.ship_available)
    )
      put(`/posts/${post.id}`);
    else {
      console.log("test");
    }
  };

  console.log(data.category_id);

  return (
    <Authenticated auth={props.auth} header={<h2>Edit</h2>}>
      <div className="main_contents">
        <TitleBar page={"edit"} title={`Edit:${data.title}`} post_id={post.id} />
        <form className="route_page" onSubmit={handleSendPosts}>
          <div className="create_map">
            {data.map_url.length > 0 ? (
              <iframe
                src={data.map_url}
                width="600"
                height="450"
                allowfullscreen
                loading="lazy"
              ></iframe>
            ) : (
              <div className="none_map">
                <a href="https://www.google.co.jp/maps" target="_blank" rer="noopener noreferrer">
                  <p>Google Map</p>
                </a>
              </div>
            )}
            <input
              className="input_map_url"
              type="text"
              placeholder="マップURLを入力してください．"
              value={data.map_url}
              onChange={(e) => setData("map_url", extractGoogleMapsSrc(e.target.value))}
            />
            {/* <span>{props.errors.map_url}</span> */}
          </div>

          <div className="route_detail">
            <div className="create_header">
              <div className="input_title">
                <input
                  type="text"
                  placeholder="タイトルを入力してください．"
                  value={data.title}
                  onChange={(e) => setData("title", e.target.value)}
                />
                {/* <span>{props.errors.title}</span> */}

                {/* <select
                  // value={post.category.id}
                  onChange={(e) => setData("category_id", e.target.value)}
                > */}
                {/* {categories.map((category: any) => (
                  <option value={category.id}>{category.category_name}</option>
                ))} */}
                {/* <option value={1}>経路</option>
                  <option value={2}>施設</option>
                  <option value={3}>景色</option>
                </select> */}
                <div>
                  <span className="category_icon">
                    {post.category.category_name == "Route" ? (
                      <LordIcon
                        src="https://cdn.lordicon.com/rxtfetez.json"
                        trigger="hover"
                        stroke="bold"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={40}
                      />
                    ) : post.category.category_name == "Facility" ? (
                      <LordIcon
                        src="https://cdn.lordicon.com/pfdotuzr.json"
                        trigger="hover"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={40}
                      />
                    ) : (
                      <LordIcon
                        src="https://cdn.lordicon.com/esrfxuri.json"
                        trigger="hover"
                        stroke="bold"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={40}
                      />
                    )}
                  </span>
                </div>
              </div>

              <div className="input_sg_point">
                <input
                  type="text"
                  placeholder="出発地点"
                  value={data.start_point}
                  onChange={(e) => setData("start_point", e.target.value)}
                />
                {/* <span>{props.errors.start_point}</span> */}

                <input
                  type="text"
                  placeholder="到着地点"
                  value={data.goal_point}
                  onChange={(e) => setData("goal_point", e.target.value)}
                />
                {/* <span>{props.errors.goal_point}</span> */}
              </div>
            </div>

            <textarea
              placeholder="内容を入力してください．"
              value={data.body}
              onChange={(e) => setData("body", e.target.value)}
            ></textarea>
            {/* <span>{props.errors.body}</span> */}

            <div className="select_situation">
              <div
                className={`select_weather ${
                  post.category.category_name == "Facility" ? "none_edit" : ""
                }`}
              >
                <div className="before">
                  <div>
                    <input
                      type="radio"
                      id="sunny_b"
                      name="before"
                      value="sunny"
                      checked={data.weather_before_id == "sunny"}
                      onChange={(e) => setData("weather_before_id", e.target.value)}
                    />
                    <label
                      htmlFor="sunny_b"
                      className={`${
                        data.weather_before_id == "sunny" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/ingirgpt.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cloudy_b"
                      name="before"
                      value="cloudy"
                      checked={data.weather_before_id == "cloudy"}
                      onChange={(e) => setData("weather_before_id", e.target.value)}
                    />
                    <label
                      htmlFor="cloudy_b"
                      className={`${
                        data.weather_before_id == "cloudy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/zawvkqfy.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="rainy_b"
                      name="before"
                      value="rainy"
                      checked={data.weather_before_id == "rainy"}
                      onChange={(e) => setData("weather_before_id", e.target.value)}
                    />
                    <label
                      htmlFor="rainy_b"
                      className={`${
                        data.weather_before_id == "rainy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/jtslwgho.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="snowy_b"
                      name="before"
                      value="snowy"
                      checked={data.weather_before_id == "snowy"}
                      onChange={(e) => setData("weather_before_id", e.target.value)}
                    />
                    <label
                      htmlFor="snowy_b"
                      className={`${
                        data.weather_before_id == "snowy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/sjtzcwfd.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                </div>
                <p>↓</p>
                <div className="after">
                  <div>
                    <input
                      type="radio"
                      id="sunny_a"
                      name="after"
                      value="sunny"
                      checked={data.weather_after_id == "sunny"}
                      onChange={(e) => setData("weather_after_id", e.target.value)}
                    />
                    <label
                      htmlFor="sunny_a"
                      className={`${
                        data.weather_after_id == "sunny" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/ingirgpt.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cloudy_a"
                      name="after"
                      value="cloudy"
                      checked={data.weather_after_id == "cloudy"}
                      onChange={(e) => setData("weather_after_id", e.target.value)}
                    />
                    <label
                      htmlFor="cloudy_a"
                      className={`${
                        data.weather_after_id == "cloudy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/zawvkqfy.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="rainy_a"
                      name="after"
                      value="rainy"
                      checked={data.weather_after_id == "rainy"}
                      onChange={(e) => setData("weather_after_id", e.target.value)}
                    />
                    <label
                      htmlFor="rainy_a"
                      className={`${
                        data.weather_after_id == "rainy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/jtslwgho.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="snowy_a"
                      name="after"
                      value="snowy"
                      checked={data.weather_after_id == "snowy"}
                      onChange={(e) => setData("weather_after_id", e.target.value)}
                    />
                    <label
                      htmlFor="snowy_a"
                      className={`${
                        data.weather_after_id == "snowy" ? "select_situation_input" : ""
                      }`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/sjtzcwfd.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                </div>
                {post.category.category_name == "Facility" ? (
                  <>
                    <p>施設カテゴリーでは選択できません．</p>
                  </>
                ) : (
                  <>
                    <p>走行時の天候を選択してください．</p>
                  </>
                )}
              </div>

              <div className="select_vehicle">
                <div className="vehicle_list">
                  <div>
                    <input
                      type="checkbox"
                      id="walk_available"
                      name="walk_available"
                      checked={data.walk_available}
                      onChange={(e) => setData("walk_available", e.target.checked)}
                    />
                    <label
                      htmlFor="walk_available"
                      className={` ${data.walk_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/oxbjzlrk.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="bicycle_available"
                      name="bicycle_available"
                      checked={data.bicycle_available}
                      onChange={(e) => setData("bicycle_available", e.target.checked)}
                    />
                    <label
                      htmlFor="bicycle_available"
                      className={` ${data.bicycle_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/mknljqhi.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="car_available"
                      name="car_available"
                      checked={data.car_available}
                      onChange={(e) => setData("car_available", e.target.checked)}
                    />
                    <label
                      htmlFor="car_available"
                      className={` ${data.car_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/cqjfxkgf.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="bus_available"
                      name="bus_available"
                      checked={data.bus_available}
                      onChange={(e) => setData("bus_available", e.target.checked)}
                    />
                    <label
                      htmlFor="bus_available"
                      className={` ${data.bus_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/yiothpas.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                </div>

                <div className="vehicle_list">
                  <div>
                    <input
                      type="checkbox"
                      id="train_available"
                      name="train_available"
                      checked={data.train_available}
                      onChange={(e) => setData("train_available", e.target.checked)}
                    />
                    <label
                      htmlFor="train_available"
                      className={` ${data.train_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/eomzkbrc.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="shinkansen_available"
                      name="shinkansen_available"
                      checked={data.shinkansen_available}
                      onChange={(e) => setData("shinkansen_available", e.target.checked)}
                    />
                    <label
                      htmlFor="shinkansen_available"
                      className={` ${data.shinkansen_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/dpwabcjy.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="plane_available"
                      name="plane_available"
                      checked={data.plane_available}
                      onChange={(e) => setData("plane_available", e.target.checked)}
                    />
                    <label
                      htmlFor="plane_available"
                      className={` ${data.plane_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/rpcdmsys.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      name="ship_available"
                      checked={data.ship_available}
                      onChange={(e) => setData("ship_available", e.target.checked)}
                    />
                    <label
                      htmlFor="ship_available"
                      className={` ${data.ship_available ? "select_situation_input" : ""}`}
                    >
                      <LordIcon
                        src="https://cdn.lordicon.com/pgofwoue.json"
                        trigger="click"
                        colors={{
                          primary: "#000",
                          secondary: "#000",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                </div>
                <p>走行手段を選択してください．</p>
              </div>
            </div>

            <div className="create_footer">
              <div className="posts_state">
                <div
                  onClick={() => handleCheckboxClick("is_running")}
                  className={` ${data.is_running ? "" : "none_check"} ${
                    post.category.category_name == "Facility" ? "none_edit" : ""
                  }`}
                >
                  <label htmlFor="is_running">
                    <input
                      type="checkbox"
                      id="is_running"
                      checked={data.is_running}
                      onChange={(e) => setData("is_running", e.target.checked)}
                    />
                  </label>
                  {data.is_running ? (
                    <>
                      <span className="change_before">
                        <LordIcon
                          src="https://cdn.lordicon.com/spukaklw.json"
                          trigger="hover"
                          colors={{
                            primary: "#000",
                            secondary: "#000",
                          }}
                          size={28}
                        />
                      </span>
                      <p>走行済</p>
                    </>
                  ) : (
                    <>
                      <span className="change_after">
                        <LordIcon
                          src="https://cdn.lordicon.com/muyjobwf.json"
                          trigger="hover"
                          stroke="bold"
                          colors={{
                            primary: "#000",
                            secondary: "#000",
                          }}
                          size={28}
                        />
                      </span>
                      <p>未走行</p>
                    </>
                  )}
                </div>

                <div
                  onClick={() => handleCheckboxClick("is_public")}
                  className={` ${data.is_public ? "" : "none_check"}`}
                >
                  <label htmlFor="is_public">
                    <input
                      type="checkbox"
                      id="is_public"
                      checked={data.is_public}
                      onChange={(e) => setData("is_public", e.target.checked)}
                    />
                  </label>
                  {data.is_public ? (
                    <>
                      <span className="change_before">
                        <LordIcon
                          src="https://cdn.lordicon.com/bnsmvaui.json"
                          trigger="hover"
                          colors={{
                            primary: "#000",
                            secondary: "#000",
                          }}
                          size={28}
                        />
                      </span>
                      <p>公開</p>
                    </>
                  ) : (
                    <>
                      <span className="change_after">
                        <LordIcon
                          src="https://cdn.lordicon.com/bnsmvaui.json"
                          trigger="hover"
                          state="hover-eye-off"
                          colors={{
                            primary: "#000",
                            secondary: "#000",
                          }}
                          size={28}
                        />
                      </span>
                      <p>下書き</p>
                    </>
                  )}
                </div>
              </div>
              {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
              <button
                type="submit"
                tabIndex="-1"
                className={`${
                  0 < data.title.length &&
                  data.title.length <= 20 &&
                  0 < data.body.length &&
                  data.body.length <= 300 &&
                  0 < data.map_url.length &&
                  data.map_url.length <= 600 &&
                  0 < data.start_point.length &&
                  data.start_point.length <= 12 &&
                  0 < data.goal_point.length &&
                  data.goal_point.length <= 12 &&
                  (data.walk_available ||
                    data.bicycle_available ||
                    data.car_available ||
                    data.bus_available ||
                    data.train_available ||
                    data.shinkansen_available ||
                    data.plane_available ||
                    data.ship_available)
                    ? ""
                    : "none_edit"
                }`}
              >
                <p>修正</p>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Link href="/posts">戻る</Link> */}
    </Authenticated>
  );
};

export default Edit;
