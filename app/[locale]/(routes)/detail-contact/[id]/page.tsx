"use client";

import React, { FormEvent, use, useEffect, useState } from "react";
import { Contact } from "@/app/(interface)/(types)/contact";
import IconStar from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-star";
import IconUser from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-user";
import BtnModifier from "@/app/[locale]/(components)/(Atoms)/BtnModifier/BtnModifier";
import { useTranslations } from "next-intl";
import Form from "@/app/[locale]/(components)/(Molecules)/Form/Form";

interface DetailProps {
  params: Promise<{ id: number | string }>;
}
function DetailContact({ params }: DetailProps) {
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const unwrappedParams = use(params);

  const t = useTranslations("ContactForm");

  const list: Contact[] = [
    {
      id: 1,
      firstName: "Lore",
      lastName: "Oliva",
      phone: "3208121031",
      email: "lore@lore.it",
      favorite: true,
    },
    {
      id: 2,
      firstName: "Erick",
      lastName: "Valgua",
      phone: "3400012345",
      email: "erick@lore.it",
      favorite: false,
    },
  ];
  const obj = list.find((contact) => contact.id == unwrappedParams.id);
  const [contact, setContact] = useState(obj!);
  const values = obj ? Object.values(obj) : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handlePUT = (e: FormEvent) => {
    e.preventDefault();
    console.log("Modifica:", contact);
    setIsModifyOpen(false);
  };

  useEffect(() => {
    console.log("obj", obj);
  }, []);
  return (
    <div className="relative flex-column gap-50px w-full">
      <div className="flex-between flex-cross-center gap-20px">
        <IconUser />
        <div className="flex-wrap gap-10px row-gap-5px">
          <h2>{contact.firstName}</h2>
          <h2>{contact.lastName}</h2>
        </div>
        {contact.favorite && <IconStar width={30} />}
      </div>
      <ul className="flex-column gap-20px">
        <li className="flex-column gap-5px border-b-1-s-l p-4px">
          <strong>{`${t("phone")}:`}</strong>
          <p>{contact.phone}</p>
        </li>
        <li className="flex-column gap-5px border-b-1-s-l p-4px">
          <strong>{`${t("email")}:`}</strong>
          <p>{contact.email}</p>
        </li>
      </ul>
      <BtnModifier onClick={() => setIsModifyOpen(true)} />
      {isModifyOpen && (
        <div className="absolute left-0 p-20px w-full z-i-100 bg-primary-dark">
          <button
            onClick={() => setIsModifyOpen(false)}
            className="reset-default pointer absolute end-top-10px"
          >
            x
          </button>
          <Form
            contact={contact}
            onChange={(e) => handleInputChange(e)}
            onSubmit={(e) => handlePUT(e)}
          ></Form>
        </div>
      )}
    </div>
  );
}

export default DetailContact;
