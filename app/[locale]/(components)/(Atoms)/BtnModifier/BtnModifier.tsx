import React from "react";
import IconPencil from "../(Icons-svg)/Icon-pencil";
import { useTranslations } from "next-intl";

function BtnModifier({ onClick }: { onClick: () => void }) {
  const t = useTranslations("DetailContact");
  return (
    <button
      title={t("modify")}
      onClick={onClick}
      className="btn-reset-with-bg fixed right-20px top-90px flex-center radius-50p w-60px ratio-1 bg-primary-sat-medium-light shadow-p-sat-very-dark hover-transition-40ms-easyin hover-active-scale-115"
    >
      <IconPencil />
    </button>
  );
}

export default BtnModifier;
