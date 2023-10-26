import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import { Post } from "../Types";
import TitleBar from "../../Layouts/TitleBar";

// RoutePage
const Show = (props: Post) => {
    const { post } = props;
    console.log(post);

    return (
        <Authenticated auth={props.auth} header={<h2>Index</h2>}>
            <div className="main_contents">
                <TitleBar
                    title={post.category.category_name + "/" + post.title}
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
                    <div className="route_detail"></div>
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
