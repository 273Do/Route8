import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from '@inertiajs/inertia-react';
import { Auth, Post } from "../Types"

// HomePage
const Index = (props: Auth) => {
    const { posts } = props;
    console.log(props);

    return (
        <Authenticated
            auth={props.auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }
        >
            <div className="p-12">
                <h1>Blog Name</h1>

                {posts.map((post: Post) => (
                    <div key={post.id}>
                        
                        
                        <h2 className="test">
                            <Link href={`/posts/${post.id}`}>{ post.title }</Link>
                        </h2>
                    
                        <p>{ post.body }</p>
                        <p>{ post.is_public }</p>
                        <p>{ post.walk_available }</p>
                        <p>{ post.bicycle_available }</p>
                        <p>{ post.car_available }</p>
                        <p>{ post.bus_available }</p>
                        <p>{ post.train_available }</p>
                        <p>{ post.shinkansen_available }</p>
                        <p>{ post.plane_available }</p>
                        <p>{ post.ship_available }</p>
                        <p>{ post.created_at }</p>
                    </div>
                ))}
            </div>
        </Authenticated>
    );
};

export default Index;
