"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Form from "../../(components)/(Molecules)/Form/Form";
import { Contact } from "@/app/(interface)/(types)/contact";

function AddContact() {
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    favorite: false,
  });

  /*   useEffect(() => {
    console.log(newContact);
  }, [newContact]); */

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };

  const POST = async (contact: Omit<Contact, "id">) => {
    /* const url = newContact ? `/api/contacts/${newContact.id}` : '/api/contacts'; */
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
  /* .then((newContact) => {
            if (editingContact) {
              setNewContact(
                contacts.map((c) => (c.id === editingContact.id ? newContact : c))
              );
            } else {
              setNewContact([...contacts, newContact]);
            }
            setEditingContact(null);
          }); */

  const handlePOST = (e: FormEvent) => {
    debugger;
    e.preventDefault();
    const post = POST(newContact);
    console.log("POST effetuata", post);
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
