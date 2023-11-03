import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Post } from "../Types";
import { LordIcon } from "../Common/lord-icon";
import TitleBar from "../../Layouts/TitleBar";

const Create = (props: Post) => {
  const { categories } = props;
  console.log(props);
  const { data, setData, post } = useForm({
    // 投稿
    title: "",
    body: "",
    is_public: true,
    map_url: "",

    // 移動手段
    walk_available: false,
    bicycle_available: false,
    car_available: false,
    bus_available: false,
    train_available: false,
    shinkansen_available: false,
    plane_available: false,
    ship_available: false,

    // 状態
    start_point: "",
    goal_point: "",
    weather_before_id: "sunny",
    weather_after_id: "sunny",
    is_running: true,

    // カテゴリー
    category_id: categories[0].id,
    user_id: props.auth.user.id,
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

  // console.log(data); // 確認用に追加

  const handleCheckboxClick = (checkboxName: string) => {
    // チェックボックスの状態を反転させるロジック
    setData((prevData: any) => ({
      ...prevData,
      [checkboxName]: !prevData[checkboxName],
    }));
  };

  const handleSendPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    post("/posts");
  };

  return (
    <Authenticated auth={props.auth} header={<h2>Create</h2>}>
      <div className="main_contents">
        <TitleBar page={"create"} title={"Create"} />
        {/* <div className="route_page"> */}
        <form className="route_page" onSubmit={handleSendPosts}>
          <div className="create_map">
            <iframe
              src={data.map_url}
              width="600"
              height="450"
              allowfullscreen
              loading="lazy"
            ></iframe>
            <input
              className="input_map_url"
              type="text"
              placeholder="マップURLを入力してください．"
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
                  onChange={(e) => setData("title", e.target.value)}
                />
                <span>{props.errors.title}</span>

                <select onChange={(e) => setData("category_id", e.target.value)}>
                  {/* {categories.map((category: any) => (
                    <option value={category.id}>{category.category_name}</option>
                  ))} */}
                  <option value={1}>経路</option>
                  <option value={2}>施設</option>
                  <option value={3}>景色</option>
                </select>
              </div>

              <div className="input_sg_point">
                <input
                  type="text"
                  placeholder="出発地点"
                  onChange={(e) => setData("start_point", e.target.value)}
                />
                <span>{props.errors.start_point}</span>

                <input
                  type="text"
                  placeholder="到着地点"
                  onChange={(e) => setData("goal_point", e.target.value)}
                />
                <span>{props.errors.goal_point}</span>
              </div>
            </div>

            <textarea
              placeholder="内容を入力してください．"
              onChange={(e) => setData("body", e.target.value)}
            ></textarea>
            <span>{props.errors.body}</span>

            <div className="select_situation">
              <div className={`select_weather ${data.category_id == 2 ? "none_edit" : ""}`}>
                <div className="before">
                  <div>
                    <input
                      type="radio"
                      id="sunny_b"
                      value="sunny"
                      name="before"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cloudy_b"
                      value="cloudy"
                      name="before"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="rainy_b"
                      value="rainy"
                      name="before"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="snowy_b"
                      value="snowy"
                      name="before"
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
                          primary: "#222222",
                          secondary: "#222222",
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
                      value="sunny"
                      name="after"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="cloudy_a"
                      value="cloudy"
                      name="after"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="rainy_a"
                      value="rainy"
                      name="after"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="snowy_a"
                      value="snowy"
                      name="after"
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                </div>
                {data.category_id == 2 ? (
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
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
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={52}
                      />
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="ship_available"
                      name="ship_available"
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
                          primary: "#222222",
                          secondary: "#222222",
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
                    data.category_id == 2 ? "none_edit" : ""
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
                      <LordIcon
                        src="https://cdn.lordicon.com/spukaklw.json"
                        trigger="hover"
                        colors={{
                          primary: "#f4ede4",
                          secondary: "#f4ede4",
                        }}
                        size={28}
                      />
                      <p>走行済</p>
                    </>
                  ) : (
                    <>
                      <LordIcon
                        src="https://cdn.lordicon.com/muyjobwf.json"
                        trigger="hover"
                        stroke="bold"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={28}
                      />
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
                      <LordIcon
                        src="https://cdn.lordicon.com/bnsmvaui.json"
                        trigger="hover"
                        colors={{
                          primary: "#f4ede4",
                          secondary: "#f4ede4",
                        }}
                        size={28}
                      />
                      <p>公開</p>
                    </>
                  ) : (
                    <>
                      <LordIcon
                        src="https://cdn.lordicon.com/bnsmvaui.json"
                        trigger="hover"
                        state="hover-eye-off"
                        colors={{
                          primary: "#222222",
                          secondary: "#222222",
                        }}
                        size={28}
                      />
                      <p>非公開</p>
                    </>
                  )}
                </div>
              </div>
              {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
              <button type="submit">
                <p>投稿</p>
              </button>
            </div>
          </div>
        </form>
        {/* </div> */}
      </div>
    </Authenticated>
  );
};

export default Create;
