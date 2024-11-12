import { Contact } from "@/app/(interface)/(types)/contact";
import React, { useState } from "react";
import IconStar from "../../(Atoms)/(Icons-svg)/Icon-star";
import IconDetaislList from "../../(Atoms)/(Icons-svg)/Icon-detailsList";
import { Link } from "@/i18n/routing";
import { DELETE } from "@/app/[locale]/(function)/api";

function MainList({
  list,
  onFavorite,
}: {
  list: Contact[];
  onFavorite: (contact: Contact) => void;
}) {
  const btnClasses =
    "reset-default hover-transition-40ms-easyin hover-active-scale-115 pointer";

  return (
    <ul className="flex-column gap-4px w-full">
      {list.map((contact) => (
        <li key={contact.id} className="flex-between border-b-1-s-l p-4px">
          <div className="grow-1 mr-4px overflow-hidden">
            <h4
              title={`${contact.firstName} ${contact.lastName}`}
            >{`${contact.firstName} ${contact.lastName}`}</h4>
          </div>
          <div className="flex-center gap-10px">
            <button onClick={() => onFavorite(contact)} className={btnClasses}>
              <IconStar fill={contact.favorite > 0 ? "#ffffff" : "none"} />
            </button>
            {/* <Link href={`/detail-contact/${contact.id}`} className={btnClasses}>
              <IconDetaislList />
            </Link> */}
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
