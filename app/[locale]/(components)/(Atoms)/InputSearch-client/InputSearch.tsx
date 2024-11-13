"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconSearch from "../(Icons-svg)/Icon-search";
import { Contact } from "@/app/(interface)/(types)/contact";

interface inputProps {
  onSearchContacts: (search: string) => void;
}
function InputSearch({ onSearchContacts }: inputProps) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    onSearchContacts(search);
    console.log("Input", search);
  }, [search]);
  return (
    <div className="flex-center gap-10px max-w-90p">
      <IconSearch fill="none"></IconSearch>
      <input
        className="input-reset-with-border grow-1 border-br-1-s-l radius-20px-1s4-3 p-l-4px p-b-4px max-w-80p"
        type="text"
        value={search}
        placeholder="Search contanct"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default InputSearch;
