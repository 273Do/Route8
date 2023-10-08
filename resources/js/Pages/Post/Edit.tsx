import React from "react";
import { Link, useForm } from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";
import { Post } from "../Types"

const Edit = (props:Post) => {
    const { post } = props;
    const {data, setData, put} = useForm({
        title: post.title,
        body: post.body,
        is_public: post.is_public,
        walk_available: post.walk_available,
        bicycle_available: post.bicycle_available,
        car_available: post.car_available,
        bus_available: post.bus_available,
        train_available: post.train_available,
        shinkansen_available: post.shinkansen_available,
        plane_available: post.plane_available,
        ship_available: post.ship_available
    })
    
    const handleSendPosts = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
        put(`/posts/${post.id}`);
    }

    return (
            <Authenticated auth={ props.auth } header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create
                    </h2>
                }>

                <div className="p-12">

                    <form onSubmit={ handleSendPosts }>
                        <div>
                            <h2>Title</h2>
                            <input type="text" placeholder="タイトルを入力してください．" value={ data.title } onChange={(e) => setData("title", e.target.value)}/>
                            <span className="text-red-600">{props.errors.title}</span>
                        </div>                    

                        <div>
                            <h2>Body</h2>
                            <textarea placeholder="内容を入力してください．" value={ data.body } onChange={(e) => setData("body", e.target.value)}></textarea>
                            <span className="text-red-600">{props.errors.body}</span>
                        </div>
                        <div>
                            <input type="checkbox"  name="is_public" checked={ data.is_public } onChange={(e) => setData("is_public", e.target.checked)} />
                            <label for="is_public">is_public</label>
                        </div>
                        <div>
                            <input type="checkbox"  name="walk_available" checked={ data.walk_available } onChange={(e) => setData("walk_available", e.target.checked)} />
                            <label for="walk_available">Walk</label>
                        </div>
                        <div>
                            <input type="checkbox" name="bicycle_available" checked={ data.bicycle_available } onChange={(e) => setData("bicycle_available", e.target.checked)} />
                            <label for="bicycle_available">Bicycle</label>
                        </div>
                        <div>
                            <input type="checkbox" name="car_available" checked={ data.car_available } onChange={(e) => setData("car_available", e.target.checked)} />
                            <label for="car_available">Car</label>
                        </div>
                        <div>
                            <input type="checkbox" name="bus_available" checked={ data.bus_available } onChange={(e) => setData("bus_available", e.target.checked)} />
                            <label for="bus_available">Bus</label>
                        </div>
                        <div>
                            <input type="checkbox" name="train_available" checked={ data.train_available } onChange={(e) => setData("train_available", e.target.checked)} />
                            <label for="train_available">Train</label>
                        </div>
                        <div>
                            <input type="checkbox" name="shinkansen_available" checked={ data.shinkansen_available } onChange={(e) => setData("shinkansen_available", e.target.checked)} />
                            <label for="shinkansen_available">Shinkansen</label>
                        </div>
                        <div>
                            <input type="checkbox" name="plane_available" checked={ data.plane_available } onChange={(e) => setData("plane_available", e.target.checked)} />
                            <label for="plane_available">Plane</label>
                        </div>
                         <div>
                            <input type="checkbox" name="ship_available" checked={ data.ship_available } onChange={(e) => setData("ship_available", e.target.checked)} />
                            <label for="ship_available">Ship</label>
                        </div>
                        {/* このbuttonをクリックすると、onSubmitに設定してあるhandleSendPosts関数が発火する*/}
                        <button type="submit" className="p-1 bg-purple-300 hover:bg-purple-400 rounded-md">send</button>
                    </form>

                    <Link href="/posts">戻る</Link>
                </div>

            </Authenticated>
            );
    }

export default Edit;