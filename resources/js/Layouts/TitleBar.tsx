import React from "react";
import NavLink from "@/Components/NavLink";
import { TitleBar } from "../Pages/Types";
import { LordIcon } from "../Pages/Common/lord-icon";

// HomePage
const TitleBar = ({ title }: TitleBar) => {
    return (
        <div className="title_bar">
            <h1>{title}</h1>
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
                    <li>
                        <NavLink
                            href={route("create")}
                            active={route().current("create")}
                        >
                            <LordIcon
                                src="https://cdn.lordicon.com/yymhadbu.json"
                                trigger="hover"
                                state="hover-jump"
                                colors={{ primary: "#222222" }}
                                size={28}
                            />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TitleBar;
