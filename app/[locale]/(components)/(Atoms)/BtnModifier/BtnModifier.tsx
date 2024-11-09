import React from "react";
import IconPencil from "../(Icons-svg)/Icon-pencil";

function BtnModifier({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="btn-reset-with-bg fixed right-20px bottom-20px flex-center radius-50p w-40px ratio-1 bg-primary-sat-medium-light hover-transition-40ms-easyin hover-active-scale-115"
    >
      <IconPencil />
    </button>
  );
}

export default BtnModifier;
