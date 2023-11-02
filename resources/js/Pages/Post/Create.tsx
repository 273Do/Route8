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
          </div>
          {/* <span>{props.errors.map_url}</span> */}
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
                  {categories.map((category: any) => (
                    <option value={category.id}>{category.category_name}</option>
                  ))}
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

            <div>
              <input
                type="radio"
                name="before"
                value="sunny"
                onChange={(e) => setData("weather_before_id", e.target.value)}
              />
              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="cloudy"
                onChange={(e) => setData("weather_before_id", e.target.value)}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="rainy"
                onChange={(e) => setData("weather_before_id", e.target.value)}
              />
              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="snowy"
                onChange={(e) => setData("weather_before_id", e.target.value)}
              />
              <label htmlFor="snowy">snowy</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="sunny"
                onChange={(e) => setData("weather_after_id", e.target.value)}
              />
              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="cloudy"
                onChange={(e) => setData("weather_after_id", e.target.value)}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="rainy"
                onChange={(e) => setData("weather_after_id", e.target.value)}
              />
              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="snowy"
                onChange={(e) => setData("weather_after_id", e.target.value)}
              />
              <label htmlFor="snowy">snowy</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="walk_available"
                onChange={(e) => setData("walk_available", e.target.checked)}
              />
              <label htmlFor="walk_available">Walk</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="bicycle_available"
                onChange={(e) => setData("bicycle_available", e.target.checked)}
              />
              <label htmlFor="bicycle_available">Bicycle</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="car_available"
                onChange={(e) => setData("car_available", e.target.checked)}
              />
              <label htmlFor="car_available">Car</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="bus_available"
                onChange={(e) => setData("bus_available", e.target.checked)}
              />
              <label htmlFor="bus_available">Bus</label>
            </div>

            <div>
              <input
                type="checkbox"
                name="train_available"
                onChange={(e) => setData("train_available", e.target.checked)}
              />
              <label htmlFor="train_available">Train</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="shinkansen_available"
                onChange={(e) => setData("shinkansen_available", e.target.checked)}
              />
              <label htmlFor="shinkansen_available">Shinkansen</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="plane_available"
                onChange={(e) => setData("plane_available", e.target.checked)}
              />
              <label htmlFor="plane_available">Plane</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="ship_available"
                onChange={(e) => setData("ship_available", e.target.checked)}
              />
              <label htmlFor="ship_available">Ship</label>
            </div>

            <div className="create_footer">
              <div className="posts_state">
                <div
                  onClick={() => handleCheckboxClick("is_running")}
                  className={` ${data.is_running ? "" : "none_check"}`}
                >
                  <label htmlFor="is_running">
                    <input
                      type="checkbox"
                      id="is_running"
                      checked={data.is_running}
                      onChange={(e) => setData("is_running", e.target.checked)}
                    />
                  </label>
                  <LordIcon
                    src="https://cdn.lordicon.com/spukaklw.json"
                    trigger="hover"
                    colors={{
                      primary: `${data.is_running ? "#f4ede4" : "#222222"}`,
                      secondary: `${data.is_running ? "#f4ede4" : "#222222"}`,
                    }}
                    size={28}
                  />
                  <p>走行済</p>
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
                  <LordIcon
                    src="https://cdn.lordicon.com/bnsmvaui.json"
                    trigger="hover"
                    colors={{
                      primary: `${data.is_public ? "#f4ede4" : "#222222"}`,
                      secondary: `${data.is_public ? "#f4ede4" : "#222222"}`,
                    }}
                    size={28}
                  />
                  <p>公開</p>
                </div>
              </div>
              {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
              <button type="submit">send</button>
            </div>
          </div>
        </form>
        {/* </div> */}
      </div>
    </Authenticated>
  );
};

export default Create;
