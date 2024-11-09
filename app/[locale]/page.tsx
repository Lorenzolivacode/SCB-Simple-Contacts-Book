"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, useEffect, useState } from "react";
import { Contact } from "../(interface)/(types)/contact";
import Form from "./(components)/(Molecules)/Form/Form";
import BtnAdd from "./(components)/(Atoms)/BtnAdd/BtnAdd";
import MainList from "./(components)/(Organisms)/MainList/MainList";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  /*  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => setContacts(data));
  }, []); */

  const list: Contact[] = [
    {
      id: 1,
      firstName: "Lore",
      lastName: "Oliva",
      phone: "3208121031",
      email: "lore@lore.it",
      favorite: true,
    },
    {
      id: 2,
      firstName: "Erick",
      lastName: "Valgua",
      phone: "3400012345",
      email: "erick@lore.it",
      favorite: false,
    },
  ];

  return (
    <>
      <BtnAdd />
      <MainList list={list} />
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
    </>
  );
}
