import React, { Dispatch, SetStateAction } from "react";

function BtnOption({
  state,
  setState,
  children,
}: {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => setState(!state)}
      className={`${
        state ? "opacity-6 scale-97" : ""
      } flex-center btn-reset-with-bg w-20px h-20px bg-primary-sat-medium-light p-2px radius-4px hover-transition-40ms-easyin hover-active-scale-98 hover-active-opacity-85 pointer`}
    >
      {children}
    </button>
  );
}

export default BtnOption;
