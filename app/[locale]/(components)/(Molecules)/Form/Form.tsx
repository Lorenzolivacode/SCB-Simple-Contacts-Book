import React, { FormEvent, useEffect } from "react";
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

  useEffect(() => {
    console.log("contact", contact);
    console.log("valid", formValidation);
  }, [contact]);

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
        disabled={!formValidation}
        className={`hover-transition-40ms-easyin hover-opacity-85 hover-scale-98 txt-c-primary-dark radius-5px pointer ${
          formValidation
            ? "bg-secondary-sat-medium"
            : "bg-secondary-dark opacity-6"
        }`}
        type="submit"
      >
        {t("submit")}
      </button>
    </form>
  );
}

export default Form;
