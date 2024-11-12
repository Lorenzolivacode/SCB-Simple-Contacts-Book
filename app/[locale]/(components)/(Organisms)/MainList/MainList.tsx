import { Contact } from "@/app/(interface)/(types)/contact";
import React, { useState } from "react";
import IconStar from "../../(Atoms)/(Icons-svg)/Icon-star";
import IconDetaislList from "../../(Atoms)/(Icons-svg)/Icon-detailsList";
import { Link } from "@/i18n/routing";
import { DELETE } from "@/app/[locale]/(function)/api";

interface MainListProps {
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
                  <div className="flex-column overflow-hidden">
                    <strong>Email:</strong>
                    <p>{contact.email}</p>
                  </div>
                  <div className="flex-column overflow-hidden">
                    <strong>Telefono:</strong>
                    <p>{contact.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-center gap-10px">
            <button onClick={() => onFavorite(contact)} className={btnClasses}>
              <IconStar fill={contact.favorite > 0 ? "#ffffff" : "none"} />
            </button>
            <Link href={`/detail-contact/${contact.id}`} className={btnClasses}>
              <IconDetaislList />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MainList;
