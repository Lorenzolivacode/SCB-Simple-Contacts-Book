import React, { FormEvent } from "react";
import { Contact } from "../../../../(interface)/(types)/contact";
import { useTranslations } from "next-intl";

function Form({
  contact,
  onChange,
  onSubmit,
}: {
  contact: Contact | Omit<Contact, "id">;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  const t = useTranslations("ContactForm");
  const inputList: { name: keyof Omit<Contact, "id">; placeholder: string }[] =
    [
      {
        name: "firstName",
        placeholder: t("name"),
      },
      {
        name: "lastName",
        placeholder: t("surname"),
      },
      {
        name: "phone",
        placeholder: t("phone"),
      },
      {
        name: "email",
        placeholder: t("email"),
      },
    ];

  const firstNameValidation = contact.firstName.length;
  const lastNameValidation = contact.lastName.length;
  const phoneValidation = contact.phone.length;
  const emailValidation = contact.email.length;

  const formValidation =
    firstNameValidation > 0 &&
    lastNameValidation > 0 &&
    phoneValidation > 0 &&
    emailValidation > 0;
  return (
    <form onSubmit={onSubmit} className="flex-column gap-20px w-full">
      <h2 className="mb-20px">
        {"id" in contact ? t("titlePut") : t("titlePost")}
      </h2>
      {inputList.map((el) => {
        return (
          <input
            className="input-reset-with-border p-x-6px p-y-4px border2-p-sat-m-l radius-4px radius-20px-1s4-3 txt-c-inherit"
            key={el.name}
            onChange={onChange}
            name={el.name}
            title={`${t("insert")} ${el.placeholder.toLowerCase()}`}
            value={String(contact[el.name])}
            type="text"
            placeholder={el.placeholder}
          />
        );
      })}
      <button
        title={t("saveContacts")}
        disabled={!formValidation}
        className={`hover-transition-40ms-easyin hover-opacity-85 hover-scale-98 f-size-1 txt-c-primary-medium radius-4px p-4px pointer ${
          formValidation
            ? "bg-secondary-sat-medium"
            : "bg-secondary-dark opacity-6"
        }`}
        type="submit"
      >
        {formValidation ? t("submit") : t("saveBtnDisabled")}
      </button>
    </form>
  );
}

export default Form;
