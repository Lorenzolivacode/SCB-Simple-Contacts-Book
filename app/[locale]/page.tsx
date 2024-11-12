"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Contact } from "../(interface)/(types)/contact";
import BtnAdd from "./(components)/(Atoms)/BtnAdd/BtnAdd";
import MainList from "./(components)/(Organisms)/MainList/MainList";
import InputSearch from "./(components)/(Atoms)/InputSearch-client/InputSearch";
import { GET, PUT } from "./(function)/api";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [orderedContacts, setOrderedContacts] = useState<Contact[]>([]);
  const [isOrderNameSur, setIsOrderNameSur] = useState(false);

  const [updatedContact, setUpdatedContact] = useState<Contact | null>(null);
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [error, setError] = useState("");

  /* (async () => {
    try {
      const res = await fetch("/api/contacts/");
      console.log("res", res);

      const data = await res.json();
      console.log("Lista:", data);

      setContacts(data);
    } catch (err) {
      console.error("Errore durante la lettura dei contatti:", err);
      if (typeof err === "string") {
        setError(err);
      } else {
        setError("error");
      }
    }
  })(); */

  const handleGET = async () => {
    const data = await GET({ error: setError });
    setContacts(data);
    return data;
  };

  useEffect(() => {
    if (updatedContact) {
      handlePUT(updatedContact);
      /* console.log("updatedContact", updatedContact); */
      setUpdatedContact(null); //Evita loop
    } else {
      (async () => {
        const data = await handleGET();
      })();
      /* console.log("updatedContact in GET", updatedContact);
      console.log("GET effettuata");
      console.log("Ordered contacts in GET", orderedContacts); */
    }
  }, [updatedContact]);

  useEffect(() => {
    const alphabeticOred = contacts.sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
    setOrderedContacts(alphabeticOred);
    /* console.log("Ordered contacts", orderedContacts); */
  }, [contacts]);

  /*TODO const obj ={
  a: [
    {
      id: 1,
      firstName: "Alberto",
      lastName: "Oliva",
      phone: "3208121031",
      email: "lore@lore.it",
      favorite: true,
    },
    {
      id: 2,
      firstName: "Alessandro",
      lastName: "Valgua",
      phone: "3400012345",
      email: "erick@lore.it",
      favorite: false,
    },
  ],
  b:[
    {
      id: 3,
      firstName: "Bho",
      lastName: "Oliva",
      phone: "3208121031",
      email: "lore@lore.it",
      favorite: true,
    },
    {
      id: 4,
      firstName: "Beppe",
      lastName: "Valgua",
      phone: "3400012345",
      email: "erick@lore.it",
      favorite: false,
    },
  ]
} */
  //TODO modale di ricerca lettere con link => #lettera titolo

  const handleSearchContacts = (inputSearch: string) => {
    const newList = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        contact.email.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setOrderedContacts(newList);
  };

  const handlePUT = async (contact: Contact) => {
    const data = await PUT({ id: contact.id, contact, error: setError });
    console.log("PUT data", data);

    /* handleGET(); */
  };

  const handleFavorite = (contact: Contact) => {
    setUpdatedContact({
      ...contact,
      favorite: contact.favorite === 0 ? 1 : 0,
    });
  };

  /* useEffect(() => {
    if (updatedContact) {
      handlePUT(updatedContact);
      setCheckFavorite(!checkFavorite);
      console.log("checkFavorite UPC", checkFavorite);
      console.log("updatedContact", updatedContact);
    }

  }, [updatedContact]); */

  if (error.length > 0 || contacts.length < 1) {
    return (
      <div className="flex-column flex-cross-center m-auto">
        {contacts.length < 1 && <h2>404</h2>}
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <InputSearch onSearchContacts={handleSearchContacts}></InputSearch>
      <BtnAdd />
      <MainList onFavorite={handleFavorite} list={orderedContacts} />
    </>
  );
}
