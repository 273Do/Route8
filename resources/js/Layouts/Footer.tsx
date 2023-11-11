import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
// import { Auth, Post } from "../Types";
import { LordIcon } from "../Pages/Common/lord-icon";

const Footer = ({ user_data }: { user_data: any }) => {
  const [theme, setTheme] = useState<string>(user_data.dark_theme_enabled ? "dark" : "light");
  const [effect, setEffect] = useState<string>(user_data.map_effect_enabled ? "ON" : "OFF");
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
      root.style.setProperty(
        "--icon_color",
        "invert(15%) sepia(20%) saturate(0%) hue-rotate(177deg) brightness(88%) contrast(102%)"
      );
      root.style.setProperty(
        "--icon_sub_color",
        "invert(93%) sepia(4%) saturate(634%) hue-rotate(336deg) brightness(104%) contrast(91%)"
      );
    } else if (theme === "dark") {
      root.style.setProperty("--bg", "#222222");
      root.style.setProperty("--sub_bg", "#f4ede4");
      root.style.setProperty("--text", "#f4ede4");
      root.style.setProperty("--sub_text", "#222222");
      root.style.setProperty("--input_bg", "#f4ede4");
      root.style.setProperty("--input_text", "#222222");
      root.style.setProperty(
        "--icon_color",
        "invert(93%) sepia(4%) saturate(634%) hue-rotate(336deg) brightness(104%) contrast(91%)"
      );
      root.style.setProperty(
        "--icon_sub_color",
        "invert(15%) sepia(20%) saturate(0%) hue-rotate(177deg) brightness(88%) contrast(102%)"
      );
    }
  }, [theme]);

  const {
    data: themeData,
    setData: setThemeData,
    put: putTheme,
  } = useForm({
    theme: !user_data.dark_theme_enabled,
  });

  const toggleTheme = () => {
    putTheme(`/${user_data.id}/dark_theme`);
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    if (effect === "ON") root.style.setProperty("--map_effect", "grayscale(60%) sepia(25%)");
    else if (effect === "OFF") root.style.setProperty("--map_effect", "grayscale(0%) sepia(0%)");
  }, [effect]);

  const {
    data: effectData,
    setData: setEffectData,
    put: putEffect,
  } = useForm({ effect: !user_data.map_effect_enabled });

  const toggleEffect = () => {
    putEffect(`/${user_data.id}/map_effect`);
    if (effect === "ON") {
      setEffect("OFF");
    } else {
      setEffect("ON");
    }
  };

  return (
    <footer>
      <p className="copy_light">273DoWorks</p>
      <ul>
        <li onClick={() => toggleEffect()}>
          <LordIcon
            // src="https://cdn.lordicon.com/ygumtulo.json"
            // trigger="morph"
            // state="morph-slider"
            src="https://cdn.lordicon.com/sqopewut.json"
            trigger="hover"
            colors={{ primary: "#000" }}
            size={28}
          />
        </li>
        <li onClick={() => toggleTheme()}>
          <LordIcon
            src="https://cdn.lordicon.com/nktbqhlt.json"
            trigger="morph"
            state={`morph-bulb-${theme == "light" ? "OFF" : "ON"}`} //"morph-bulb-ON"
            colors={{ primary: "#000" }}
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
