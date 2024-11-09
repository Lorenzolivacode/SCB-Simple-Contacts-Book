import React, { FormEvent, useEffect } from "react";
import { Contact } from "./../../../(interface)/(types)/contact";

function Form({
  contact,
  onChange,
  onSubmit,
}: {
  contact: Contact | Omit<Contact, "id">;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  /*   interface IItemList {
    name: string;
    placeholder: string;
  } */
  const inputList: { name: keyof Omit<Contact, "id">; placeholder: string }[] =
    [
      {
        name: "firstName",
        placeholder: "Name",
      },
      {
        name: "lastName",
        placeholder: "Surname",
      },
      {
        name: "phone",
        placeholder: "Phone number",
      },
      {
        name: "email",
        placeholder: "Email address",
      },
    ];

  useEffect(() => {
    console.log("contact", contact);
  }, []);
  return (
    <form onSubmit={onSubmit} className="flex-column gap-10px w-240px">
      <h3>Questa è la form</h3>
      {inputList.map((el) => {
        return (
          <input
            className="p-x-6px"
            key={el.name}
            onChange={onChange}
            name={el.name}
            title={el.name}
            value={String(contact[el.name])}
            type="text"
            placeholder={el.placeholder}
          />
        );
      })}
      <button
        className="hover-transition-40ms-easyin hover-opacity-85 hover-scale-98 bg-secondary-sat-medium txt-c-primary-dark radius-5px pointer"
        type="submit"
      >
        Invia
      </button>
    </form>
  );
}

export default Form;
