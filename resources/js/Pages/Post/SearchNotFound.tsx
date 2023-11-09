import React from "react";
import { LordIcon } from "../Common/lord-icon";

const SearchNotFound = () => {
  return (
    <div>
      <LordIcon
        src="https://cdn.lordicon.com/iolpqlal.json"
        trigger="loop"
        delay={1500}
        colors={{
          primary: "#222222",
          secondary: "#222222",
        }}
        size={200}
      />
    </div>
  );
};

export default SearchNotFound;
