import Link from "next/link";
import React from "react";
import IconStar from "../(Icons-svg)/Icon-star";

function LinkFavourites() {
  return (
    <Link href={""} className="pointer">
      <IconStar width={50} />
    </Link>
  );
}

export default LinkFavourites;
