import React from "react";

function MainList() {
  const list = [
    {
      id: "1",
      name: "Lore",
      surname: "Oliva",
      phone: "3208121031",
      email: "lore@lore.it",
      workRole: "Frontend",
      address: "Corso Umberto",
      notes: "",
    },
    {
      id: "",
      name: "",
      surname: "",
      phone: "",
      email: "",
      workRole: "",
      address: "",
      notes: "",
    },
  ];
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <h3>{`${item.name} ${item.surname}`}</h3>
        </li>
      ))}
    </ul>
  );
}

export default MainList;
