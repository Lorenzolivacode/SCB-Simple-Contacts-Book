import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";

function Header() {
  return (
    <header className="fixed top-0 flex-around p-12px w-full h-70px z-i-110 shadow-light-minus10 bg-background-0d8">
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
    </header>
  );
}

export default Header;
