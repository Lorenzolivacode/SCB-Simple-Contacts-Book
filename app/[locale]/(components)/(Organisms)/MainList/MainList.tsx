import { Contact } from "@/app/(interface)/(types)/contact";
import React from "react";
import IconStar from "../../(Atoms)/(Icons-svg)/Icon-star";
import IconDetaislList from "../../(Atoms)/(Icons-svg)/Icon-detailsList";
import { Link } from "@/i18n/routing";

function MainList({ list }: { list: Contact[] }) {
  const btnClasses =
    "reset-default hover-transition-40ms-easyin hover-active-scale-115 pointer";
  return (
    <ul className="flex-column gap-4px w-full">
      {list.map((contact) => (
        <li key={contact.id} className="flex-between border-b-1-s-l p-4px">
          <h4>{`${contact.firstName} ${contact.lastName}`}</h4>
          <div className="flex-center gap-10px">
            <button className={btnClasses}>
              <IconStar fill={contact.favorite === true ? "#ffffff" : "none"} />
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
