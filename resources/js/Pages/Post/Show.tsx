import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link } from '@inertiajs/inertia-react';
import { Post } from "../Types"

// RoutePage
const Show = (props:Post) => {
    const { post } = props; 
    console.log(post);

    return (
        <Authenticated auth={props.auth} header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Index
                </h2>
            }>
            
            <div className="p-12">
                <h1>{ post.title }</h1>
                
                <div>
                    <h3>本文</h3>
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
                    
                    <div>
                        <Link href={`/posts/${post.id}/edit`}>編集</Link>
                    </div>
                </div>
                
                <div>
                    <Link href="/posts">戻る</Link>
                </div>
            </div>
            
        </Authenticated>
        );
}

export default Show;