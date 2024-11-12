import React from "react";
import "./Header.css";
import InputSearch from "../../(Atoms)/InputSearch-client/InputSearch";
import LinkFavourites from "../../(Atoms)/LinkFavourites/LinkFavourites";
import { Link } from "@/i18n/routing";
import Image from "next/image";

function Header() {
  return (
    <header className="relative fixed top-0 flex-around p-12px w-full z-i-110 shadow-light-minus10">
      <Link href={"/"}>
        <Image
          title="Home"
          width={45}
          height={45}
          alt="icon - scb"
          src={"/icon-scb.png"}
        />
      </Link>
      <Link href={"/"}>
        <h1 title="Home" className="txt-center">
          SCB
        </h1>
      </Link>
      {/* <InputSearch /> */}
      {/* <LinkFavourites /> */}
    </header>
  );
}

export default Header;
