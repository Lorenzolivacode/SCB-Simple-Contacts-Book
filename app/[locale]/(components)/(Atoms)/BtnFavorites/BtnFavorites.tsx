import React from "react";
import IconStar from "../(Icons-svg)/Icon-star";

function BtnFavorites() {
  return (
    <button className="btn-reset-with-bg grow-05 txt-center bg-primary-sat-medium-light p-4px radius-4px max-w-220px hover-transition-40ms-easyin hover-active-scale-98 hover-active-opacity-85">
      <IconStar />
    </button>
  );
}

export default BtnFavorites;
