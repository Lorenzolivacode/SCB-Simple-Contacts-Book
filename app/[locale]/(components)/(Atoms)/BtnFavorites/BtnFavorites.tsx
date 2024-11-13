import React, { Dispatch, SetStateAction } from "react";
import IconStar from "../(Icons-svg)/Icon-star";

function BtnFavorites({
  isFavoritesList,
  setIsFavoritesList,
}: {
  isFavoritesList: boolean;
  setIsFavoritesList: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      onClick={() => setIsFavoritesList(!isFavoritesList)}
      className={`${
        isFavoritesList ? "opacity-6 scale-9" : ""
      } btn-reset-with-bg grow-05 txt-center bg-primary-sat-medium-light p-4px radius-4px max-w-220px hover-transition-40ms-easyin hover-active-scale-98 hover-active-opacity-85 pointer`}
    >
      <IconStar
        stroke="#fff"
        fill={isFavoritesList ? "#fff" : "none"}
        width={24}
      />
    </button>
  );
}

export default BtnFavorites;
