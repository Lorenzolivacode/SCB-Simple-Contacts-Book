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
    <div className="flex gap-10px">
      <IconSearch fill="none"></IconSearch>
      <input
        className="input-reset-with-border border-br-1-s-l radius-20px-1s4-3 p-l-4px p-b-4px"
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
