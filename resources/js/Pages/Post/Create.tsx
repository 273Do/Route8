import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Post } from "../Types";

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

    // console.log(data); // 確認用に追加

    const handleSendPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        post("/posts");
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <div className="p-12">
                <form onSubmit={handleSendPosts}>
                    <div>
                        <h2>Title</h2>
                        <input
                            type="text"
                            placeholder="タイトルを入力してください．"
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <span className="text-red-600">
                            {props.errors.title}
                        </span>
                    </div>

                    <div>
                        <h2>Body</h2>
                        <textarea
                            placeholder="内容を入力してください．"
                            onChange={(e) => setData("body", e.target.value)}
                        ></textarea>
                        <span className="text-red-600">
                            {props.errors.body}
                        </span>
                    </div>

                    <div>
                        <h2>Map_url</h2>
                        <input
                            type="text"
                            placeholder="マップURLを入力してください．"
                            onChange={(e) => setData("map_url", e.target.value)}
                        />
                        <span className="text-red-600">
                            {props.errors.map_url}
                        </span>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="is_public"
                            checked={data.is_public}
                            onChange={(e) =>
                                setData("is_public", e.target.checked)
                            }
                        />
                        <label htmlFor="is_public">is_public</label>
                    </div>

                    <div>
                        <h2>start_point</h2>
                        <input
                            type="text"
                            placeholder="出発地点"
                            onChange={(e) =>
                                setData("start_point", e.target.value)
                            }
                        />
                        <span className="text-red-600">
                            {props.errors.start_point}
                        </span>
                    </div>

                    <div>
                        <h2>goal_point</h2>
                        <input
                            type="text"
                            placeholder="到着地点"
                            onChange={(e) =>
                                setData("goal_point", e.target.value)
                            }
                        />
                        <span className="text-red-600">
                            {props.errors.goal_point}
                        </span>
                    </div>

                    <div>
                        <legend>weather_before_id</legend>

                        <div>
                            <input
                                type="radio"
                                name="before"
                                value="sunny"
                                onChange={(e) =>
                                    setData("weather_before_id", e.target.value)
                                }
                            />
                            <label htmlFor="sunny">sunny</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="before"
                                value="cloudy"
                                onChange={(e) =>
                                    setData("weather_before_id", e.target.value)
                                }
                            />
                            <label htmlFor="cloudy">cloudy</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="before"
                                value="rainy"
                                onChange={(e) =>
                                    setData("weather_before_id", e.target.value)
                                }
                            />
                            <label htmlFor="rainy">rainy</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="before"
                                value="snowy"
                                onChange={(e) =>
                                    setData("weather_before_id", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("weather_after_id", e.target.value)
                                }
                            />
                            <label htmlFor="sunny">sunny</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="after"
                                value="cloudy"
                                onChange={(e) =>
                                    setData("weather_after_id", e.target.value)
                                }
                            />
                            <label htmlFor="cloudy">cloudy</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="after"
                                value="rainy"
                                onChange={(e) =>
                                    setData("weather_after_id", e.target.value)
                                }
                            />
                            <label htmlFor="rainy">rainy</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="after"
                                value="snowy"
                                onChange={(e) =>
                                    setData("weather_after_id", e.target.value)
                                }
                            />
                            <label htmlFor="snowy">snowy</label>
                        </div>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="is_running"
                            onChange={(e) =>
                                setData("is_running", e.target.checked)
                            }
                        />
                        <label htmlFor="is_running">is_running</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="walk_available"
                            onChange={(e) =>
                                setData("walk_available", e.target.checked)
                            }
                        />
                        <label htmlFor="walk_available">Walk</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="bicycle_available"
                            onChange={(e) =>
                                setData("bicycle_available", e.target.checked)
                            }
                        />
                        <label htmlFor="bicycle_available">Bicycle</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="car_available"
                            onChange={(e) =>
                                setData("car_available", e.target.checked)
                            }
                        />
                        <label htmlFor="car_available">Car</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="bus_available"
                            onChange={(e) =>
                                setData("bus_available", e.target.checked)
                            }
                        />
                        <label htmlFor="bus_available">Bus</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="train_available"
                            onChange={(e) =>
                                setData("train_available", e.target.checked)
                            }
                        />
                        <label htmlFor="train_available">Train</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="shinkansen_available"
                            onChange={(e) =>
                                setData(
                                    "shinkansen_available",
                                    e.target.checked,
                                )
                            }
                        />
                        <label htmlFor="shinkansen_available">Shinkansen</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="plane_available"
                            onChange={(e) =>
                                setData("plane_available", e.target.checked)
                            }
                        />
                        <label htmlFor="plane_available">Plane</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="ship_available"
                            onChange={(e) =>
                                setData("ship_available", e.target.checked)
                            }
                        />
                        <label htmlFor="ship_available">Ship</label>
                    </div>

                    <div>
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
                    </div>

                    {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
                    <button
                        type="submit"
                        className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
                    >
                        send
                    </button>
                </form>

                <Link href="/posts">戻る</Link>
            </div>
        </Authenticated>
    );
};

export default Create;
