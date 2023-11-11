import React from "react";
import { LordIcon } from "../Common/lord-icon";

const SearchNotFound = () => {
  return (
    <div className="not_found">
      <LordIcon
        src="https://cdn.lordicon.com/iolpqlal.json"
        trigger="loop"
        delay={1000}
        colors={{
          primary: "#000",
          secondary: "#000",
        }}
        size={200}
      />
    </div>
  );
};

export default SearchNotFound;
