"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Contact } from "../(interface)/(types)/contact";
import BtnAdd from "./(components)/(Atoms)/BtnAdd/BtnAdd";
import MainList from "./(components)/(Organisms)/MainList/MainList";
import InputSearch from "./(components)/(Atoms)/InputSearch-client/InputSearch";
import { GET, PUT } from "./(function)/api";
import BtnSetting from "./(components)/(Atoms)/BtnSetting/BtnSetting";
import BtnFavorites from "./(components)/(Atoms)/BtnFavorites/BtnFavorites";
import SettingOptions from "./(components)/(Molecules)/SettingOptions/SettingOptions";
import { checkCookieBoolean, handleCookieBoolean } from "./(function)/cookie";
import LoadingComponent from "./(components)/(Molecules)/LoadingComponent/LoadingComponent";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [orderedContacts, setOrderedContacts] = useState<Contact[]>([]);

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [numberContacts, setNumberContacts] = useState(0);
  const [numberFavorites, setNumberFavorites] = useState(0);
  const [isOrderNameSur, setIsOrderNameSur] = useState(true);
  const [isOrderEmail, setIsOrderEmail] = useState(false);
  const [isVisibleDetails, setIsVisibleDetails] = useState(false);
  const [isReverseList, setIsReverseList] = useState(false);

  const [updatedContact, setUpdatedContact] = useState<Contact | null>(null);
  const [isFavoriteList, setIsFavoriteList] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const t = useTranslations("Home");

  const handleGET = async () => {
    setIsLoading(true);
    const data = await GET({ error: setError });

    const copyData = [...data];
    const favorites = copyData.filter((c) => c.favorite === 1);

    setContacts(data);
    handleSort(data);
    setNumberContacts(data.length);
    setNumberFavorites(favorites.length);
    setIsLoading(false);
    return data;
  };

  const handlePUT = async (contact: Contact) => {
    await PUT({ id: contact.id, contact, error: setError });
  };

  const handleSort = (data: Contact[]) => {
    if (isOrderEmail) {
      const alphabeticOrder = data.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
      setOrderedContacts(alphabeticOrder);
      console.log("sorted", orderedContacts);
    } else if (isOrderNameSur) {
      const alphabeticOrder = data.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
      setOrderedContacts(alphabeticOrder);
    } else {
      const alphabeticOrder = data.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      );
      setOrderedContacts(alphabeticOrder);
    }
  };

  const handleFavorite = (contact: Contact) => {
    setUpdatedContact({
      ...contact,
      favorite: contact.favorite === 0 ? 1 : 0,
    });
  };

  const handleSearchContacts = (inputSearch: string) => {
    const newList = contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(inputSearch.toLowerCase()) ||
        contact.email.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setOrderedContacts(newList);
  };

  useEffect(() => {
    checkCookieBoolean(isOrderNameSur, setIsOrderNameSur);
  }, []);

  useEffect(() => {
    if (updatedContact) {
      handlePUT(updatedContact);
      setUpdatedContact(null); //Evita loop
    } else {
      (async () => {
        await handleGET();
      })();
    }
  }, [updatedContact]);

  useEffect(() => {
    if (contacts.length === 0) return;
    const sortedContacts = [...contacts];

    if (isFavoriteList) {
      const favorites = sortedContacts.filter((c) => c.favorite === 1);
      handleSort(favorites);
      return;
    }

    handleSort(sortedContacts);
  }, [isOrderNameSur, isOrderEmail, isFavoriteList, contacts]);

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

  if (error.length > 0 || contacts.length < 1) {
    if (isLoading) return <LoadingComponent />;
    return (
      <div className="flex-column flex-cross-center m-auto">
        {contacts.length < 1 && <h2>404</h2>}
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <>
      <InputSearch onSearchContacts={handleSearchContacts} />

      <section className="flex-column gap-8px">
        <div className="flex-center gap-8px w-full max-w-90p">
          <BtnSetting state={isSettingOpen} setState={setIsSettingOpen} />
          <BtnFavorites
            isFavoritesList={isFavoriteList}
            setIsFavoritesList={setIsFavoriteList}
          />
        </div>
        <SettingOptions
          isOpen={isSettingOpen}
          numberContacts={numberContacts}
          numberFavorites={numberFavorites}
          nameState={isOrderNameSur}
          setName={() =>
            handleCookieBoolean(`isOrderNameSur`, setIsOrderNameSur, 10)
          }
          emailState={isOrderEmail}
          setEmail={() => setIsOrderEmail(!isOrderEmail)}
          detailsState={isVisibleDetails}
          setDetails={() => setIsVisibleDetails(!isVisibleDetails)}
          reverseState={isReverseList}
          setReverse={() => setIsReverseList(!isReverseList)}
        />
      </section>

      <BtnAdd />
      <MainList
        onFavorite={handleFavorite}
        list={orderedContacts}
        isOrderNameSur={isOrderNameSur}
        isVisibleDetail={isVisibleDetails}
        isReverseList={isReverseList}
      />
    </>
  );
}
