import React, { Dispatch, SetStateAction } from "react";
import styles from "./SettingOptions.module.css";
import { useTranslations } from "next-intl";
import { useTheme } from "@/app/[locale]/(function)/useTheme";

import IconViewDetails from "../../(Atoms)/(Icons-svg)/Icon-view-details";
import IconReverse from "../../(Atoms)/(Icons-svg)/Icon-reverse";
import BtnOption from "../../(Atoms)/BtnOption/BtnOption";
import SelectLanguage from "../../(Atoms)/SelectLanguageInline-client/SelectLanguageInline";
import Toggle from "../../(Atoms)/Toggle/Toggle";
import IconUser from "../../(Atoms)/(Icons-svg)/Icon-user";
import IconEmail from "../../(Atoms)/(Icons-svg)/Icon-email";
import IconSun from "../../(Atoms)/(Icons-svg)/Icon-sun";
import IconMoon from "../../(Atoms)/(Icons-svg)/Icon-moon";

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
  const tComp = useTranslations("Components");

  const { isDarkMode, toggleTheme } = useTheme();

  {
    /* <p className="txt-center l-height-1">8</p> */
    {
      /* <p className="txt-c-white txt-center l-height-1">@</p> */
    }
  }
  const options = [
    {
      state: nameState,
      setState: setName,
      label: nameState ? t("nameOrdered") : t("surnameOrdered"),
      content: <IconUser width={16} fill1="#fff" fill2="#fff" fill3="#fff" />,
    },
    {
      state: emailState,
      setState: setEmail,
      label: t("emailOrdered"),
      content: <IconEmail width={16} />,
    },
    {
      state: detailsState,
      setState: setDetails,
      label: t("viewDetails"),
      content: (
        <IconViewDetails
          width={16}
          strokeCircle={!detailsState ? "none" : "#ffffff"}
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
                <BtnOption
                  title={option.label}
                  state={option.state}
                  setState={option.setState}
                >
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
        <li title={tComp("toggleTheme")} className="flex-cross-center gap-4px">
          <IconSun
            stroke={isDarkMode ? undefined : "#3a93dc"}
            fill={isDarkMode ? "none" : "#3a93dc"}
          />
          <Toggle
            title={`${isDarkMode ? "Dark mode" : "Light mode"} ${tComp(
              "active"
            )}`}
            active={isDarkMode}
            setActive={toggleTheme}
          />
          <IconMoon
            width={16}
            stroke={isDarkMode ? undefined : "#3a93dc"}
            fill={isDarkMode ? undefined : "none"}
          />
        </li>
      </ul>
    </section>
  );
}

export default SettingOptions;
