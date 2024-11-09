import { Link } from "@/i18n/routing";
import React from "react";

function BtnAdd() {
  return (
    <Link
      href={"/add-contact"}
      className="fixed right-20px bottom-20px flex-center radius-50p w-40px ratio-1 bg-primary-sat-medium-light hover-transition-40ms-easyin hover-scale-115"
    >
      <span className="f-bold f-size-1d8">+</span>
    </Link>
  );
}

export default BtnAdd;
