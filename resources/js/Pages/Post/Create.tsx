import React from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { Post } from "../Types";

const Create = (props: Post) => {
    const { data, setData, post } = useForm({
        title: "",
        body: "",
        is_public: true,
        walk_available: false,
        bicycle_available: false,
        car_available: false,
        bus_available: false,
        train_available: false,
        shinkansen_available: false,
        plane_available: false,
        ship_available: false,
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
