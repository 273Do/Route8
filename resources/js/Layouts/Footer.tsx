import React, { useState, useEffect } from "react";
import { LordIcon } from "../Pages/Common/lord-icon";

const Footer = ({ user_theme }: { user_theme: boolean }) => {
  const [theme, setTheme] = useState<string>(user_theme ? "dark" : "light"); // dark_theme_enabled に基づいて初期テーマを設定
  const root = document.documentElement;

  useEffect(() => {
    // テーマが変更されたときにDOMにスタイルを適用
    if (theme === "light") {
      root.style.setProperty("--bg", "#f4ede4");
      root.style.setProperty("--sub_bg", "#222222");
      root.style.setProperty("--text", "#222222");
      root.style.setProperty("--sub_text", "#f4ede4");
      root.style.setProperty("--input_bg", "#222222");
      root.style.setProperty("--input_text", "#f4ede4");
    } else if (theme === "dark") {
      root.style.setProperty("--bg", "#222222");
      root.style.setProperty("--sub_bg", "#f4ede4");
      root.style.setProperty("--text", "#f4ede4");
      root.style.setProperty("--sub_text", "#222222");
      root.style.setProperty("--input_bg", "#f4ede4");
      root.style.setProperty("--input_text", "#222222");
    }
  }, [theme]);

  const toggleTheme = () => {
    // テーマを切り替え
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <footer>
      <p className="copy_light">273DoWorks</p>
      <ul>
        <li>
          <LordIcon
            // src="https://cdn.lordicon.com/ygumtulo.json"
            // trigger="morph"
            // state="morph-slider"
            src="https://cdn.lordicon.com/sqopewut.json"
            trigger="hover"
            colors={{ primary: "#222222" }}
            size={28}
          />
        </li>
        <li onClick={() => toggleTheme()}>
          <LordIcon
            src="https://cdn.lordicon.com/nktbqhlt.json"
            trigger="morph"
            state="morph-bulb-OFF" //"morph-bulb-ON"
            colors={{ primary: "#222222" }}
            size={28}
          />
        </li>
      </ul>
      <div className="theme_icon"></div>
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
