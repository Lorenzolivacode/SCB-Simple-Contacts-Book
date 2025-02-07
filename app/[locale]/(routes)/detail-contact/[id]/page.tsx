"use client";

import React, { FormEvent, use, useEffect, useState } from "react";
import { Contact } from "@/app/(interface)/(types)/contact";
import IconStar from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-star";
import IconUser from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-user";
import BtnModifier from "@/app/[locale]/(components)/(Atoms)/BtnModifier/BtnModifier";
import { useTranslations } from "next-intl";
import Form from "@/app/[locale]/(components)/(Molecules)/Form/Form";
import BtnLinkAction from "@/app/[locale]/(components)/(Atoms)/BtnLinkAction/BtnLinkAction";
import { DELETE, GET, PATCH, PUT } from "@/app/[locale]/(function)/api";
import { useRouter } from "@/i18n/routing";
import IconDelete from "@/app/[locale]/(components)/(Atoms)/(Icons-svg)/Icon-delete";
import { getCookie } from "@/app/[locale]/(function)/cookie";
import LoadingComponent from "@/app/[locale]/(components)/(Molecules)/LoadingComponent/LoadingComponent";

interface DetailProps {
  params: Promise<{ id: string }>;
}
function DetailContact({ params }: DetailProps) {
  const tForm = useTranslations("ContactForm");
  const t = useTranslations("DetailContact");

  /* const isOrderNameSur = getCookie("isOrderNameSur") === "true"; */
  const [isOrderNameSur, setIsOrderNameSur] = useState(false);

  const [isModifyOpen, setIsModifyOpen] = useState(false);

  const [contact, setContact] = useState<Contact | null>(null);
  const [checkFavorite, setCheckFavorite] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  /* const id = Number(unwrappedParams.id); */
  const router = useRouter();

  useEffect(() => {
    if (id) {
      handleGET();
    }
    setIsOrderNameSur(getCookie("isOrderNameSur") === "true");
  }, [id]);

  const handleGET = async () => {
    setIsLoading(true);
    const data = await GET({ id: id, error: setError });
    if (!data || Array.isArray(data)) {
      return;
    }
    setContact(data);
    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (contact)
      setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handlePUT = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (contact && contact.id) {
      await PUT({ id: contact.id, contact, error: setError });
    }
    setIsModifyOpen(false);
  };

  const handlePATCH = async () => {
    if (contact && contact.id) {
      await PATCH({
        id: contact.id,
        error: setError,
        paramsUpdate: { favorite: contact.favorite },
      });
    }
  };

  const handleDELETE = async () => {
    if (contact) {
      try {
        await DELETE({ id: contact.id, error: setError });
        router.replace("/");
      } catch (err) {
        console.error("Errore durante la eliminazione del contatto:", err);
        setError(t("error"));
      }
    }
  };

  const handleFavorite = () => {
    if (contact) {
      setContact({
        ...contact,
        favorite: contact.favorite === 0 ? 1 : 0,
      });
      setCheckFavorite(!checkFavorite);
    }
  };

  useEffect(() => {
    /* handlePUT(); */
    handlePATCH();
  }, [checkFavorite]);

  useEffect(() => {}, [contact]);

  if (error.length > 0 || contact == null) {
    if (isLoading) return <LoadingComponent />;
    return (
      <div className="flex-column flex-cross-center m-auto">
        {contact == null && <h2>404</h2>}
        <h2>{error}</h2>
      </div>
    );
  }

  const liClass =
    "flex-between flex-cross-center gap-16px flex-wrap border-b-1-s-l p-4px overflow-auto";
  const liChildrenClass = "flex-column gap-4px";

  return (
    <div className="relative flex-column gap-50px mt-50px w-full">
      <div className="flex-between flex-cross-center gap-20px flex-wrap">
        <IconUser />
        <div
          title={`${contact.firstName} ${contact.lastName}`}
          className="flex-column gap-10px row-gap-5px overflow-hidden"
        >
          {isOrderNameSur ? (
            <>
              <h2>{contact.firstName}</h2>
              <h2>{contact.lastName}</h2>
            </>
          ) : (
            <>
              <h2>{contact.lastName}</h2>
              <h2>{contact.firstName}</h2>
            </>
          )}
        </div>
        <button
          onClick={() => handleFavorite()}
          className="reset-default hover-transition-40ms-easyin hover-active-scale-115 pointer"
        >
          <IconStar width={30} fill={contact.favorite ? undefined : "none"} />
        </button>
      </div>
      <button
        title={t("delete")}
        className="btn-reset-with-bg fixed top-90px right-120px flex-center radius-50p w-60px ratio-1 bg-primary-sat-medium-light shadow-p-sat-very-dark hover-transition-40ms-easyin hover-active-scale-115 pointer"
        onClick={handleDELETE}
      >
        <IconDelete width={30} stroke="#ffffff" />
      </button>
      <BtnModifier onClick={() => setIsModifyOpen(true)} />
      <ul className="flex-column gap-20px">
        <li className={liClass}>
          <div className={liChildrenClass}>
            <strong>{`${tForm("phone")}:`}</strong>
            <p>{contact.phone}</p>
          </div>
          {contact && (
            <BtnLinkAction
              contact={`tel: ${contact.phone}`}
              label={t("call")}
            />
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
              label={t("write")}
            />
          )}
        </li>
      </ul>
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
