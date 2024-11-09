import React from "react";
import "./Header.css";
import InputSearch from "../../(Atoms)/InputSearch-client/InputSearch";
import LinkFavourites from "../../(Atoms)/LinkFavourites/LinkFavourites";
import { Link } from "@/i18n/routing";

function Header() {
  return (
    <header className="relative fixed p-12px w-full z-i-110 shadow-light-minus10">
      <Link href={"/"}>
        <h1 className="txt-center">SCB</h1>
      </Link>
      {/* <InputSearch /> */}
      <LinkFavourites />
    </header>
  );
}

export default Header;
