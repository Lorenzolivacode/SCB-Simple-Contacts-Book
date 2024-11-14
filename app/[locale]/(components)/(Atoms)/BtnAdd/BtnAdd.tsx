import { Link } from "@/i18n/routing";
import React from "react";
import IconPlus from "../(Icons-svg)/Icon-plus";
import { useTranslations } from "next-intl";
import { title } from "process";

function BtnAdd() {
  const t = useTranslations("Components");

  return (
    <Link
      title={t("addContacts")}
      href={"/add-contact"}
      className="fixed right-20px bottom-20px flex-center radius-50p w-60px ratio-1 bg-primary-sat-medium-light shadow-p-sat-very-dark hover-transition-40ms-easyin hover-active-scale-115"
    >
      <IconPlus width={30} />
    </Link>
  );
}

export default BtnAdd;
