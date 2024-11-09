"use client";
import React from "react";
import Image from "next/image";

interface inputProps {}
function InputSearch() {
  return (
    <div className="flex gap-10px">
      <Image
        src={"/icons/search.svg"}
        width={20}
        height={20}
        alt="Icon search"
      />
      <input type="text" value={""} placeholder="Search contanct" />
    </div>
  );
}

export default InputSearch;
