"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Contact } from "../(interface)/(types)/contact";
import BtnAdd from "./(components)/(Atoms)/BtnAdd/BtnAdd";
import MainList from "./(components)/(Organisms)/MainList/MainList";
import InputSearch from "./(components)/(Atoms)/InputSearch-client/InputSearch";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/contacts");
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
    })();
  }, []);

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
    setFilteredContacts(newList);
  };

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
      <MainList list={filteredContacts} />
    </>
  );
}
