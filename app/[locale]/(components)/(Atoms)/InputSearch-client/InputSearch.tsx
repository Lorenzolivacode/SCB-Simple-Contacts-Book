"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import IconSearch from "../(Icons-svg)/Icon-search";

interface inputProps {
  onSearchContacts: (search: string) => void;
}
function InputSearch({ onSearchContacts }: inputProps) {
  const t = useTranslations("Components");
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSearchContacts(search);
  }, [search]);

  return (
    <div className="flex-center gap-10px max-w-90p">
      <IconSearch fill="none"></IconSearch>
      <input
        title={t("inputSearchPlaceholder")}
        className="input-reset-with-border grow-1 border-br-1-s-l radius-20px-1s4-3 p-l-4px p-b-4px max-w-80p txt-c-inherit"
        type="text"
        value={search}
        placeholder={t("inputSearchPlaceholder")}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
}

export default InputSearch;
