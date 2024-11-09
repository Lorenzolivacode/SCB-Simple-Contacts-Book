import { Contact } from "@/app/(interface)/(types)/contact";
import React from "react";

function MainList({ list }: { list: Contact[] }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <h4>{`${item.firstName} ${item.lastName}`}</h4>
        </li>
      ))}
    </ul>
  );
}

export default MainList;
