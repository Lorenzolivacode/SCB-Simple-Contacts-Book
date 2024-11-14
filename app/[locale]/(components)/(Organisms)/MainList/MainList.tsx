"use client";

import { Contact } from "@/app/(interface)/(types)/contact";
import React from "react";
import IconStar from "../../(Atoms)/(Icons-svg)/Icon-star";
import IconDetailslList from "../../(Atoms)/(Icons-svg)/Icon-detailsList";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
/* import { IAlphabetContacts } from "@/app/[locale]/(function)/handleAlphabet"; */

interface MainListProps {
  /* list: IAlphabetContacts | null; */
  list: Contact[];
  onFavorite: (contact: Contact) => void;
  isOrderNameSur: boolean;
  isVisibleDetail: boolean;
  isReverseList: boolean;
}
function MainList({
  list,
  onFavorite,
  isOrderNameSur,
  isVisibleDetail,
  isReverseList,
}: MainListProps) {
  const t = useTranslations("ContactForm");
  const tComp = useTranslations("Components");

  const btnClasses =
    "reset-default hover-transition-40ms-easyin hover-active-scale-115 pointer";

  return (
    <ul
      className={`${
        !isReverseList ? "flex-column" : "flex-column-reverse"
      } gap-20px w-full`}
    >
      {list.map((contact) => (
        <li key={contact.id} className="flex-between border-b-1-s-l p-4px">
          <div className="grow-1 mr-4px overflow-hidden">
            <div className="flex-column gap-16px ">
              <h4 title={`${contact.firstName} ${contact.lastName}`}>
                {isOrderNameSur
                  ? `${contact.firstName} ${contact.lastName}`
                  : `${contact.lastName} ${contact.firstName}`}
              </h4>
              {isVisibleDetail && (
                <div className="flex-wrap gap-8px f-size-0d8">
                  <div
                    title={t("email")}
                    className="flex-column overflow-hidden"
                  >
                    <strong>{t("email")}</strong>
                    <p>{contact.email}</p>
                  </div>
                  <div
                    title={t("phone")}
                    className="flex-column overflow-hidden"
                  >
                    <strong>{t("phone")}</strong>
                    <p>{contact.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-center gap-10px">
            <button
              title={
                contact.favorite > 0
                  ? tComp("removeFavorites")
                  : tComp("addFavorites")
              }
              onClick={() => onFavorite(contact)}
              className={btnClasses}
            >
              <IconStar fill={contact.favorite > 0 ? "#ffd46b" : "none"} />
            </button>
            <Link
              title={tComp("goDetails")}
              href={`/detail-contact/${contact.id}`}
              className={btnClasses}
            >
              <IconDetailslList />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MainList;
