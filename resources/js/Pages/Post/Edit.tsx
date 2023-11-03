import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import { Post } from '../Types';

const Edit = (props: Post) => {
  const { post } = props;
  console.log(post);
  const { data, setData, put } = useForm({
    // title: post.title,
    // body: post.body,
    // is_public: post.is_public,
    // walk_available: post.walk_available,
    // bicycle_available: post.bicycle_available,
    // car_available: post.car_available,
    // bus_available: post.bus_available,
    // train_available: post.train_available,
    // shinkansen_available: post.shinkansen_available,
    // plane_available: post.plane_available,
    // ship_available: post.ship_available,

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

  const handleSendPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    put(`/posts/${post.id}`);
  };

  return (
    <Authenticated
      auth={props.auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create</h2>}
    >
      <div className="p-12">
        <iframe src={data.map_url} width="600" height="450" allowfullscreen loading="lazy"></iframe>
        <form onSubmit={handleSendPosts}>
          <div>
            <h2>Title</h2>
            <input
              type="text"
              placeholder="タイトルを入力してください．"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            <span className="text-red-600">{props.errors.title}</span>
          </div>

          <div>
            <h2>Body</h2>
            <textarea
              placeholder="内容を入力してください．"
              value={data.body}
              onChange={(e) => setData('body', e.target.value)}
            ></textarea>
            <span className="text-red-600">{props.errors.body}</span>
          </div>

          <div>
            <h2>Map_url</h2>
            <input
              type="text"
              placeholder="マップURLを入力してください．"
              value={data.map_url}
              onChange={(e) => setData('map_url', e.target.value)}
            />
            <span className="text-red-600">{props.errors.map_url}</span>
          </div>

          <div>
            <input
              type="checkbox"
              name="is_public"
              checked={data.is_public}
              onChange={(e) => setData('is_public', e.target.checked)}
            />
            <label htmlFor="is_public">is_public</label>
          </div>

          <div>
            <h2>start_point</h2>
            <input
              type="text"
              placeholder="出発地点"
              value={data.start_point}
              onChange={(e) => setData('start_point', e.target.value)}
            />
            <span className="text-red-600">{props.errors.start_point}</span>
          </div>

          <div>
            <h2>goal_point</h2>
            <input
              type="text"
              placeholder="到着地点"
              value={data.goal_point}
              onChange={(e) => setData('goal_point', e.target.value)}
            />
            <span className="text-red-600">{props.errors.goal_point}</span>
          </div>

          <div>
            <legend>weather_before_id</legend>

            <div>
              <input
                type="radio"
                name="before"
                value="sunny"
                checked={data.weather_before_id == 'sunny'}
                onChange={(e) => setData('weather_before_id', e.target.value)}
              />
              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="cloudy"
                checked={data.weather_before_id == 'cloudy'}
                onChange={(e) => setData('weather_before_id', e.target.value)}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="rainy"
                checked={data.weather_before_id == 'rainy'}
                onChange={(e) => setData('weather_before_id', e.target.value)}
              />
              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                name="before"
                value="snowy"
                checked={data.weather_before_id == 'snowy'}
                onChange={(e) => setData('weather_before_id', e.target.value)}
              />
              <label htmlFor="snowy">snowy</label>
            </div>
          </div>

          <div>
            <legend>weather_after_id</legend>

            <div>
              <input
                type="radio"
                name="after"
                value="sunny"
                checked={data.weather_after_id == 'sunny'}
                onChange={(e) => setData('weather_after_id', e.target.value)}
              />
              <label htmlFor="sunny">sunny</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="cloudy"
                checked={data.weather_after_id == 'cloudy'}
                onChange={(e) => setData('weather_after_id', e.target.value)}
              />
              <label htmlFor="cloudy">cloudy</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="rainy"
                checked={data.weather_after_id == 'rainy'}
                onChange={(e) => setData('weather_after_id', e.target.value)}
              />
              <label htmlFor="rainy">rainy</label>
            </div>

            <div>
              <input
                type="radio"
                name="after"
                value="snowy"
                checked={data.weather_after_id == 'snowy'}
                onChange={(e) => setData('weather_after_id', e.target.value)}
              />
              <label htmlFor="snowy">snowy</label>
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              name="is_running"
              checked={data.is_running}
              onChange={(e) => setData('is_running', e.target.checked)}
            />
            <label htmlFor="is_running">is_running</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="walk_available"
              checked={data.walk_available}
              onChange={(e) => setData('walk_available', e.target.checked)}
            />
            <label htmlFor="walk_available">Walk</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="bicycle_available"
              checked={data.bicycle_available}
              onChange={(e) => setData('bicycle_available', e.target.checked)}
            />
            <label htmlFor="bicycle_available">Bicycle</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="car_available"
              checked={data.car_available}
              onChange={(e) => setData('car_available', e.target.checked)}
            />
            <label htmlFor="car_available">Car</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="bus_available"
              checked={data.bus_available}
              onChange={(e) => setData('bus_available', e.target.checked)}
            />
            <label htmlFor="bus_available">Bus</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="train_available"
              checked={data.train_available}
              onChange={(e) => setData('train_available', e.target.checked)}
            />
            <label htmlFor="train_available">Train</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="shinkansen_available"
              checked={data.shinkansen_available}
              onChange={(e) => setData('shinkansen_available', e.target.checked)}
            />
            <label htmlFor="shinkansen_available">Shinkansen</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="plane_available"
              checked={data.plane_available}
              onChange={(e) => setData('plane_available', e.target.checked)}
            />
            <label htmlFor="plane_available">Plane</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="ship_available"
              checked={data.ship_available}
              onChange={(e) => setData('ship_available', e.target.checked)}
            />
            <label htmlFor="ship_available">Ship</label>
          </div>

          {/* <div>
                        <h2>Category</h2>
                        <select
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            {categories.map((category: any) => (
                                <option value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div> */}

          {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
          <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">
            send
          </button>
        </form>

        <Link href="/posts">戻る</Link>
      </div>
    </Authenticated>
  );
};

export default Edit;
