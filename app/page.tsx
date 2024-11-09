"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Contact } from "./(interface)/(types)/contact";
import Form from "./(components)/(Molecules)/Form/Form";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    favorite: false,
  });

  useEffect(() => {
    fetch("/api/contacts").then((res) => console.log("res", res));
    /* res.json()) */
    /* .then((data) => setContacts(data)); */
  }, []);

  useEffect(() => {
    console.log(newContact);
  }, [newContact]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, [event.target.name]: event.target.value });
  };

  const addOrUpdateContact = (contact: Omit<Contact, "id">) => {
    /* const url = newContact ? `/api/contacts/${newContact.id}` : '/api/contacts'; */
    const url = "/api/contacts";
    /* const method = newContact ? 'PUT' : 'POST'; */
    const method = "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    }).then((res) => res.json());
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
  };

  const POST = (e: FormEvent) => {
    e.preventDefault();
    const POST = addOrUpdateContact(newContact);
    console.log("POST effetuata", POST);
  };
  return (
    <main className="flex-column gap-50px flex-cross-center p-20px p-t-40px m-auto">
      <Form
        contact={newContact}
        onChange={(e) => handleInputChange(e)}
        onSubmit={(e) => POST(e)}
      />
      <form onSubmit={(e) => POST(e)} className="flex-column gap-10px w-240px">
        <input
          onChange={handleInputChange}
          name="firstName"
          value={newContact.firstName}
          type="text"
          placeholder="nome"
        />
        <input
          onChange={handleInputChange}
          name="lastName"
          value={newContact.lastName}
          type="text"
          placeholder="cognome"
        />
        <input
          onChange={handleInputChange}
          name="phone"
          value={newContact.phone}
          type="text"
          placeholder="Phone"
        />
        <input
          onChange={handleInputChange}
          name="email"
          value={newContact.email}
          type="text"
          placeholder="email"
        />
        <button type="submit">Invia</button>
      </form>

      <ul>
        {contacts.map((contact) => {
          return (
            <>
              <li>{contact.firstName}</li>
              <li>{contact.lastName}</li>
              <li>{contact.phone}</li>
              <li>{contact.email}</li>
              <li>{contact.favorite}</li>
              <li>{contact.id}</li>
            </>
          );
        })}
      </ul>
    </main>
  );
}
