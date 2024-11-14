import { Contact } from "@/app/(interface)/(types)/contact";
export interface IAlphabetContacts {
  [key: string]: any[];
}

export const generateAlphabetArray = (): string[] => {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
};

const generatealphabetObject = (): IAlphabetContacts => {
  return generateAlphabetArray().reduce((acc, letter) => {
    acc[letter] = [];
    return acc;
  }, {} as IAlphabetContacts);
};
/* const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]; */

export const getContactsGroupedByFirstLetter = (data: Contact[]) => {
  /*   const contacts: IAlphabetContacts = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  }; */

  const alphabet = generateAlphabetArray();
  const contacts = generatealphabetObject();
  alphabet.map((letter) => {
    const contactsInLetter = data.filter((contact) => {
      return contact.firstName.toLowerCase().startsWith(letter);
    });
    contacts[letter as keyof IAlphabetContacts] = contactsInLetter;
  });
  /* console.log("Contacts", contacts); */

  return contacts;
};

export default getContactsGroupedByFirstLetter;
