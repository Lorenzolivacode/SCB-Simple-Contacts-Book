"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Form from "../../(components)/(Molecules)/Form/Form";
import { Contact } from "@/app/(interface)/(types)/contact";
import { useRouter } from "@/i18n/routing";

function AddContact() {
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    favorite: 0,
  });

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };

  const POST = async (contact: Omit<Contact, "id">) => {
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const newContact = await res.json();
      console.log("Nuovo contatto aggiunto:", newContact);
    } catch (error) {
      console.error("Errore durante l'aggiunta del contatto:", error);
    }
  };

  const handlePOST = (e: FormEvent) => {
    e.preventDefault();
    const post = POST(newContact);
    console.log("POST effetuata", post);
    router.replace("/");
  };
  return (
    <Form
      contact={newContact}
      onChange={(e) => handleInputChange(e)}
      onSubmit={(e) => handlePOST(e)}
    />
  );
}

export default AddContact;
