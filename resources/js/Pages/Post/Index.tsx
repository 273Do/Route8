import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";
import NavLink from "@/Components/NavLink";
import { LordIcon } from "../Common/lord-icon";

// HomePage
const Index = (props: Auth) => {
    const { posts } = props;
    console.log(props);

    const handleDeletePost = (id: number) => {
        router.delete(`/posts/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        });
    };

    const putWeatherState = (weather: string): string => {
        let url: string = "";
        if (weather == "sunny") url = "https://cdn.lordicon.com/ingirgpt.json";
        else if (weather == "cloudy")
            url = "https://cdn.lordicon.com/zawvkqfy.json";
        else if (weather == "rainy")
            url = "https://cdn.lordicon.com/jtslwgho.json";
        else if (weather == "snowy")
            url = "https://cdn.lordicon.com/fyhyivaa.json";
        return url;
    };

    return (
        <Authenticated auth={props.auth} header={<h2>Index</h2>}>
            <div className="main_contents">
                <div className="title_bar">
                    {/* {props.auth.user.name} */}
                    <h1>Route</h1>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <LordIcon
                                        src="https://cdn.lordicon.com/cnpvyndp.json"
                                        trigger="morph"
                                        state="morph-home-1"
                                        colors={{ primary: "#222222" }}
                                        size={28}
                                    />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("index")}
                                    active={route().current("index")}
                                >
                                    <LordIcon
                                        src="https://cdn.lordicon.com/yxyampao.json"
                                        trigger="hover"
                                        colors={{ primary: "#222222" }}
                                        size={28}
                                    />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("create")}
                                    active={route().current("create")}
                                >
                                    <LordIcon
                                        src="https://cdn.lordicon.com/prjooket.json"
                                        trigger="morph"
                                        state="morph-marked-bookmark"
                                        colors={{ primary: "#222222" }}
                                        size={28}
                                    />
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="route_list">
                    {/* <Link href="/posts/create">Create</Link> */}
                    {posts.map((post: Post) => (
                        <div className="route_board" key={post.id}>
                            <Link
                                className="link_no_underline"
                                href={`/posts/${post.id}`}
                            >
                                <div className="route_card">
                                    {/* <button
                                        onClick={() =>
                                            handleDeletePost(post.id)
                                        }
                                    >
                                        delete
                                    </button> */}
                                    <div className="route_header">
                                        <p>
                                            {post.situation.start_point} →{" "}
                                            {post.situation.goal_point}
                                        </p>
                                        <ul>
                                            <li>
                                                <Link
                                                    href={`/posts/${post.id}/edit`}
                                                >
                                                    <LordIcon
                                                        src="https://cdn.lordicon.com/uwbjfiwe.json"
                                                        trigger="hover"
                                                        colors={{
                                                            primary: "#f4ede4",
                                                        }}
                                                        size={25}
                                                    />
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() =>
                                                    handleDeletePost(post.id)
                                                }
                                            >
                                                <LordIcon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="morph"
                                                    state="morph-trash-full"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                            <li>
                                                <LordIcon
                                                    src="https://cdn.lordicon.com/prjooket.json"
                                                    trigger="morph"
                                                    state="morph-marked-bookmark"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                        </ul>
                                    </div>

                                    {/* <p>{post.body}</p> */}
                                    {/* <p>{post.is_public}</p> */}
                                    <iframe
                                        src={post.map_url}
                                        width="480"
                                        height="260"
                                        allowFullScreen
                                        loading="lazy"
                                        frameborder="0"
                                    ></iframe>
                                    <div className="route_footer">
                                        <ul className="route_weather">
                                            <li>
                                                <LordIcon
                                                    src={putWeatherState(
                                                        post.situation
                                                            .weather_before_id,
                                                    )}
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                        secondary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                            <li>
                                                <LordIcon
                                                    src={putWeatherState(
                                                        post.situation
                                                            .weather_after_id,
                                                    )}
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                        secondary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                        </ul>
                                        <ul className="route_vehicle">
                                            <li>
                                                <LordIcon
                                                    src="https://cdn.lordicon.com/jtslwgho.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                        secondary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                            <li>
                                                <LordIcon
                                                    src="https://cdn.lordicon.com/jtslwgho.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                        secondary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                            <li>
                                                <LordIcon
                                                    src="https://cdn.lordicon.com/jtslwgho.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors={{
                                                        primary: "#f4ede4",
                                                        secondary: "#f4ede4",
                                                    }}
                                                    size={25}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <p>{post.created_at}</p> */}
                                    {/* <p>{post.map_url}</p> */}
                                    {/* <p>{post.category.category_name}</p> */}
                                    {/* <p>{post.user.name}</p> */}
                                    {/* <p>
                                            {post.situation.weather_before_id}
                                        </p>
                                        <p>{post.situation.weather_after_id}</p>
                                        <p>{post.situation.is_running}</p>

                                        <p>{post.vehicle.walk_available}</p>
                                        <p>{post.vehicle.bicycle_available}</p>
                                        <p>{post.vehicle.car_available}</p>
                                        <p>{post.vehicle.bus_available}</p>
                                        <p>{post.vehicle.train_available}</p>
                                        <p>
                                            {post.vehicle.shinkansen_available}
                                        </p>
                                        <p>{post.vehicle.plane_available}</p>
                                        <p>{post.vehicle.ship_available}</p> */}
                                </div>
                            </Link>
                            <p className="card_title">{post.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
