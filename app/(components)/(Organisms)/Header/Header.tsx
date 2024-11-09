import React from "react";
import "./Header.css";
import InputSearch from "../../(Atoms)/InputSearch-client/InputSearch";
import LinkFavourites from "../../(Atoms)/LinkFavourites/LinkFavourites";

function Header() {
  return (
    <header className="relative p-fixed p-12px w-full z-i-110 shadow-light-minus10">
      <h1 className="txt-center">SCB</h1>
      {/* <InputSearch /> */}
      <LinkFavourites />
    </header>
  );
}

export default Header;
