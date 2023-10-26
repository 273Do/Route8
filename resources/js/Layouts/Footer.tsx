import React from "react";
import { LordIcon } from "../Pages/Common/lord-icon";

const Footer = () => {
    return (
        <footer>
            <p className="copy_light">273DoWorks</p>

            <div className="theme_icon">
                <LordIcon
                    src="https://cdn.lordicon.com/nktbqhlt.json"
                    trigger="morph"
                    state="morph-bulb-OFF" //"morph-bulb-ON"
                    colors={{ primary: "#222222" }}
                    size={28}
                />
            </div>
        </footer>
    );
};

// function mode() {
//   document.querySelector(".main_contents").classList.toggle("light_mode");
//   document.querySelector("#root").classList.toggle("light_mode");
//   document
//     .querySelector("header nav ul li")
//     .classList.toggle("light_mode_text");
//   document
//     .querySelector("footer nav ul li")
//     .classList.toggle("light_mode_text");
//   console.log("test");
// }

export default Footer;