import React, { Dispatch, SetStateAction } from "react";
import styles from "./SettingOptions.module.css";
import { useTranslations } from "next-intl";
import IconViewDetails from "../../(Atoms)/(Icons-svg)/Icon-view-details";
import IconReverse from "../../(Atoms)/(Icons-svg)/Icon-reverse";
import BtnOption from "../../(Atoms)/BtnOption/BtnOption";
import SelectLanguage from "../../(Atoms)/SelectLanguageInline-client/SelectLanguageInline";
import Toggle from "../../(Atoms)/Toggle/Toggle";

interface OptionProps {
  isOpen: boolean;
  numberContacts: number;
  numberFavorites: number;
  nameState: boolean;
  setName: () => void;
  emailState: boolean;
  setEmail: () => void;
  detailsState: boolean;
  setDetails: () => void;
  reverseState: boolean;
  setReverse: () => void;
}
function SettingOptions({
  isOpen,
  numberContacts,
  numberFavorites,
  nameState,
  setName,
  emailState,
  setEmail,
  detailsState,
  setDetails,
  reverseState,
  setReverse,
}: OptionProps) {
  const t = useTranslations("Home");

  const options = [
    {
      state: nameState,
      setState: setName,
      label: nameState ? t("nameOrdered") : t("surnameOrdered"),
      content: <p className="txt-center l-height-1">8</p>,
    },
    {
      state: emailState,
      setState: setEmail,
      label: t("emailOrdered"),
      content: <p className="txt-center l-height-1">@</p>,
    },
    {
      state: detailsState,
      setState: setDetails,
      label: t("viewDetails"),
      content: (
        <IconViewDetails
          width={16}
          fill={detailsState ? "none" : "#ffffff"}
          stroke="#ffffff"
        />
      ),
    },
    {
      state: reverseState,
      setState: setReverse,
      label: t("reverse"),
      content: <IconReverse width={16} fill="#ffffff" />,
    },
  ];

  const contactsInfo = [
    { state: numberContacts, label: t("numberOfContacts") },
    { state: numberFavorites, label: t("numberOfFavorites") },
  ];

  const containerLabelBtnClass =
    "flex-column flex-center gap-4px max-w-60px txt-center";

  return (
    <section
      className={`${
        !isOpen ? styles.settings_closed : styles.settings_opened
      } ${
        styles.settings
      } overflow-hidden flex-column flex-center radius-4px shadow-inset-p-very-dark border1-s-v-l w-full bg-primary-dark`}
    >
      <div className="flex-between gap-32px border-b-1-s-l p-b-8px w-full">
        <ul className="flex-center flex-column flex-wrap gap-16px border-r-1-s-l p-r-8px">
          {contactsInfo.map((info, i) => (
            <li key={i} className={containerLabelBtnClass}>
              <label className="f-size-0d7">{info.label}</label>
              <p className="w-20px f-size-1d2">{info.state}</p>
            </li>
          ))}
        </ul>

        <div className="flex-center grow-1">
          <ul className="flex-cross-start flex-main-center flex-wrap gap-16px">
            {options.map((option, i) => (
              <li key={i} className={containerLabelBtnClass}>
                <BtnOption state={option.state} setState={option.setState}>
                  {option.content}
                </BtnOption>
                <label className="f-size-0d7">{option.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="flex-center flex-wrap gap-48px p-t-8px">
        <li>
          <SelectLanguage />
        </li>
        <li>
          <Toggle active={nameState} setActive={setDetails} />
        </li>
      </ul>
    </section>
  );
}

export default SettingOptions;
