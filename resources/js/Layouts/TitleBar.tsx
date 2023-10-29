import React from "react";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { TitleBar } from "../Pages/Types";
import { LordIcon } from "../Pages/Common/lord-icon";

// HomePage
const TitleBar = ({ page, title, post_id, edit }: TitleBar) => {
    console.log(page, title, post_id, edit);

    const handleDeletePost = (id: number) => {
        router.delete(`/posts/${id}`, {
            onBefore: () => confirm("本当に削除しますか？"),
        });
    };

    if (page == "Route") {
        return (
            <div className="title_bar">
                <h1>{title}</h1>
                <nav>
                    <ul>
                        {/* MyRoute */}
                        <li>
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                <LordIcon
                                    src="https://cdn.lordicon.com/ziafkkwv.json"
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

                        <li className="create_icon">
                            <NavLink
                                href={route("create")}
                                active={route().current("create")}
                            >
                                <LordIcon
                                    src="https://cdn.lordicon.com/qtynovng.json"
                                    trigger="hover"
                                    colors={{ primary: "#222222" }}
                                    size={28}
                                />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    } else if (page == "show") {
        return (
            <div className="title_bar">
                <h1>{title}</h1>
                <nav>
                    <ul>
                        <li className={`${edit ? "" : "display_none"}`}>
                            <Link href={`/posts/${post_id}/edit`}>
                                <LordIcon
                                    src="https://cdn.lordicon.com/uwbjfiwe.json"
                                    trigger="hover"
                                    colors={{
                                        primary: "#222222",
                                    }}
                                    size={28}
                                />
                            </Link>
                        </li>
                        <li
                            className={`${edit ? "" : "display_none"}`}
                            onClick={() => handleDeletePost(post_id)}
                        >
                            <LordIcon
                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                trigger="morph"
                                state="morph-trash-full"
                                colors={{
                                    primary: "#222222",
                                }}
                                size={28}
                            />
                        </li>
                        <li>
                            <LordIcon
                                src="https://cdn.lordicon.com/prjooket.json"
                                trigger="morph"
                                state="morph-marked-bookmark"
                                colors={{
                                    primary: "#222222",
                                }}
                                size={28}
                            />
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

export default TitleBar;
