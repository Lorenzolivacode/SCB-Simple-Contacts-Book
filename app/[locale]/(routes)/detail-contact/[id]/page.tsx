"use client";

import React, { FormEvent, use, useEffect, useState } from "react";
import { Contact } from "@/app/(interface)/(types)/contact";
import IconStar from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-star";
import IconUser from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-user";
import BtnModifier from "@/app/[locale]/(components)/(Atoms)/BtnModifier/BtnModifier";
import { useTranslations } from "next-intl";
import Form from "@/app/[locale]/(components)/(Molecules)/Form/Form";
import BtnLinkAction from "@/app/[locale]/(components)/(Atoms)/BtnLinkAction/BtnLinkAction";

interface DetailProps {
  params: Promise<{ id: number | string }>;
}
function DetailContact({ params }: DetailProps) {
  const tForm = useTranslations("ContactForm");
  const t = useTranslations("DetailContact");

  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);

  const [error, setError] = useState("");

  const unwrappedParams = use(params);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/contacts/${unwrappedParams.id}`);
        console.log("res", res);

        if (!res.ok) {
          throw new Error(t("notFound"));
        }

        const data = await res.json();
        console.log("Lista:", data);

        setContact(data);
      } catch (err) {
        console.error("Errore durante la lettura dei contatti:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(t("error"));
        }
      }
    })();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (contact)
      setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handlePUT = (e: FormEvent) => {
    e.preventDefault();
    console.log("Modifica:", contact);
    setIsModifyOpen(false);
  };

  if (error.length > 0 || contact == null) {
    return (
      <div className="flex-column flex-cross-center m-auto">
        {contact == null && <h2>404</h2>}
        <h2>{error}</h2>
      </div>
    );
  }

  const liClass =
    "flex-between flex-cross-center gap-16px flex-wrap border-b-1-s-l p-4px";
  const liChildrenClass = "flex-column gap-4px";

  return (
    <div className="relative flex-column gap-50px w-full">
      <div className="flex-between flex-cross-center gap-20px flex-wrap">
        <IconUser />
        <div className="flex-wrap gap-10px row-gap-5px">
          <h2>{contact.firstName}</h2>
          <h2>{contact.lastName}</h2>
        </div>
        {contact.favorite > 0 && <IconStar width={30} />}
      </div>
      <ul className="flex-column gap-20px">
        <li className={liClass}>
          <div className={liChildrenClass}>
            <strong>{`${tForm("phone")}:`}</strong>
            <p>{contact.phone}</p>
          </div>
          {contact && (
            <BtnLinkAction contact={`tel: ${contact.phone}`} label="Chiama" />
          )}
        </li>
        <li className={liClass}>
          <div className={liChildrenClass}>
            <strong>{`${tForm("email")}:`}</strong>
            <p>{contact.email}</p>
          </div>
          {contact && (
            <BtnLinkAction
              contact={`mailto: ${contact.email}`}
              label="Scrivi"
            />
          )}
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
