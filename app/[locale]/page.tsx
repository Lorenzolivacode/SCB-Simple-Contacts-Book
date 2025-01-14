"use client";
import { useEffect, useState } from "react";

import { Contact } from "../(interface)/(types)/contact";
import BtnAdd from "./(components)/(Atoms)/BtnAdd/BtnAdd";
import MainList from "./(components)/(Organisms)/MainList/MainList";
import InputSearch from "./(components)/(Atoms)/InputSearch-client/InputSearch";
import { GET, PATCH } from "./(function)/api";
import BtnSetting from "./(components)/(Atoms)/BtnSetting/BtnSetting";
import BtnFavorites from "./(components)/(Atoms)/BtnFavorites/BtnFavorites";
import SettingOptions from "./(components)/(Molecules)/SettingOptions/SettingOptions";
import { checkCookieBoolean, handleCookieBoolean } from "./(function)/cookie";
import LoadingComponent from "./(components)/(Molecules)/LoadingComponent/LoadingComponent";

import getContactsGroupedByFirstLetter, {
  IAlphabetContacts,
} from "@/app/[locale]/(function)/useAlphabet";
import ModalAlphabet from "./(components)/(Molecules)/ModalAlphabet/ModalAlphabet";

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
  const [isInSearch, setIsInSearch] = useState(false);

  const [updatedContact, setUpdatedContact] = useState<Contact | null>(null);
  const [isFavoriteList, setIsFavoriteList] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [isModalAlphaOpen, setIsModalAlphaOpen] = useState(false);

  const [dataGroup, setDataGroup] = useState<IAlphabetContacts | null>(null);

  /* const t = useTranslations("Home"); */

  const handleGET = async () => {
    setIsLoading(true);

    const data = await GET({ error: setError });

    /* const copyData = [...data]; */

    if (data && Array.isArray(data)) {
      const favorites = data.filter((c) => c.favorite === 1);
      setContacts(data);
      handleSort(data);
      setNumberContacts(data.length);
      setNumberFavorites(favorites.length);
      setIsLoading(false);

      const objData = getContactsGroupedByFirstLetter(data, isOrderNameSur);
      setDataGroup(objData);
    }
    return data;
  };

  const handlePATCH = async (updatedContact: Contact) => {
    //await PUT({ id: contact.id, contact, error: setError });

    console.log("isFavorite: ", updatedContact.favorite);

    /*     console.log("Current favorite:", contact.favorite);
    console.log("Calculated isFavorite:", isFavorite); */

    await PATCH({
      id: updatedContact.id,
      error: setError,
      paramsUpdate: { favorite: updatedContact.favorite },
    });
  };

  const handleSort = (data: Contact[]) => {
    if (isOrderEmail) {
      const alphabeticOrder = data.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
      setOrderedContacts(alphabeticOrder);
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
        `${contact.firstName.toLowerCase()} ${contact.lastName.toLowerCase()}`.includes(
          inputSearch.toLowerCase()
        ) ||
        `${contact.lastName.toLowerCase()} ${contact.firstName.toLowerCase()}`.includes(
          inputSearch.toLowerCase()
        ) ||
        contact.email.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setOrderedContacts(newList);

    if (inputSearch.length > 0) {
      setIsInSearch(true);
    } else {
      setIsInSearch(false);
    }
  };

  useEffect(() => {
    checkCookieBoolean(isOrderNameSur, setIsOrderNameSur);
  }, []);

  useEffect(() => {
    if (updatedContact) {
      handlePATCH(updatedContact);
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

  useEffect(() => {
    const tempOrderedContacts = [...contacts];

    const objData = getContactsGroupedByFirstLetter(
      tempOrderedContacts,
      isOrderNameSur
    );
    setDataGroup(objData);
  }, [orderedContacts]);

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

      {isModalAlphaOpen && (
        <ModalAlphabet onClose={() => setIsModalAlphaOpen(false)} />
      )}
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
        isFavorite={isFavoriteList}
        isOrderEmail={isOrderEmail}
        onFavorite={handleFavorite}
        listOrdered={orderedContacts}
        list={dataGroup}
        isOrderNameSur={isOrderNameSur}
        isVisibleDetail={isVisibleDetails}
        isReverseList={isReverseList}
        isInSearch={isInSearch}
        setModal={() => setIsModalAlphaOpen(true)}
      />
    </>
  );
}
