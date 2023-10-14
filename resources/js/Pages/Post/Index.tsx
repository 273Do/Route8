import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { Auth, Post } from "../Types";

// HomePage
const Index = (props: Auth) => {
    const { posts } = props;
    console.log(props);

    const handleDeletePost = (id: number) => {
        router.delete(`/posts/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }
        >
            <Link href="/posts/create">Create</Link>
            <div className="p-12">
                <h1>Blog Name</h1>

                {posts.map((post: Post) => (
                    <div key={post.id}>
                        <h2 className="test">
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </h2>

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

                        <button
                            className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md"
                            onClick={() => handleDeletePost(post.id)}
                        >
                            delete
                        </button>
                    </div>
                ))}
            </div>
        </Authenticated>
    );
};

export default Index;
