import { Contact } from "@/app/(interface)/(types)/contact";
export interface IAlphabetContacts {
  [key: string]: Contact[];
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
export const getContactsGroupedByFirstLetter = (
  data: Contact[],
  isOrderNameSur: boolean
) => {
  const alphabet = generateAlphabetArray();
  const contacts = generatealphabetObject();
  if (isOrderNameSur) {
    alphabet.map((letter) => {
      const contactsInLetter = data.filter((contact) => {
        return contact.firstName.toLowerCase().startsWith(letter);
      });
      contacts[letter as keyof IAlphabetContacts] = contactsInLetter;
    });
  } else {
    alphabet.map((letter) => {
      const contactsInLetter = data.filter((contact) => {
        return contact.lastName.toLowerCase().startsWith(letter);
      });
      contacts[letter as keyof IAlphabetContacts] = contactsInLetter;
    });
  }

  return contacts;
};

export default getContactsGroupedByFirstLetter;
