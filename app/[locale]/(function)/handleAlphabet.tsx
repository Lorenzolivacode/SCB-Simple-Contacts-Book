import { Contact } from "@/app/(interface)/(types)/contact";

interface IObject {
  a: Contact[];
  b: Contact[];
  c: Contact[];
  d: Contact[];
  e: Contact[];
  f: Contact[];
  g: Contact[];
  h: Contact[];
  i: Contact[];
  j: Contact[];
  k: Contact[];
  l: Contact[];
  m: Contact[];
  n: Contact[];
  o: Contact[];
  p: Contact[];
  q: Contact[];
  r: Contact[];
  s: Contact[];
  t: Contact[];
  u: Contact[];
  v: Contact[];
  w: Contact[];
  x: Contact[];
  y: Contact[];
  z: Contact[];
}

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

const alphabet = [
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
];

export const getContactsGroupedByFirstLetter = (data: Contact[]) => {
  const contacts: IObject = {
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
  };
  alphabet.map((letter) => {
    const contactsInLetter = data.filter((contact) => {
      return contact.firstName.toLowerCase().startsWith(letter);
    });
    contacts[letter as keyof IObject] = contactsInLetter;
  });
  console.log("Contacts", contacts);

  return contacts;
};

export default getContactsGroupedByFirstLetter;
