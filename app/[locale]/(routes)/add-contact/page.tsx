"use client";

import React, { FormEvent, useState } from "react";
import Form from "../../(components)/(Molecules)/Form/Form";
import { useRouter } from "@/i18n/routing";
import { POST } from "../../(function)/api";

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

  const handlePOST = async (e: FormEvent) => {
    e.preventDefault();

    const post = await POST({
      contact: newContact, // Passi il contatto
      error: (msg: string) => console.error(msg), // Passi una funzione per la gestione degli errori
    });
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
