import { Contact } from "@/app/(interface)/(types)/contact";
import { db } from "@/app/lib/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

interface ApiProps {
  id?: string;
  contact?: Contact;
  error: (text: string) => void;
}

const docRef = (id: string) => doc(db, "contacts", id);
const collectionRef = collection(db, "contacts");

export async function GET({ id = "", error }: ApiProps) {
  try {
    if (!id) {
      const res = await getDocs(collectionRef);
      const contacts = res.docs.map((contact) => {
        const data = contact.data();
        return {
          id: contact.id,
          firstName: data.firstName as string,
          lastName: data.lastName as string,
          phone: data.phone as string,
          favorite: data.favorite as number,
          email: data.email as string,
        };
      });
      if (contacts === undefined) {
        throw new Error("Failed to get contacts");
      }
      return contacts;
    } else {
      const res = await getDoc(docRef(id));

      if (!res.exists()) {
        throw new Error("Failed to get contact");
      }
      const data = res.data();

      return {
        id: res.id,
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        phone: data.phone as string,
        favorite: data.favorite as number,
        email: data.email as string,
      };
    }
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Error reading contacts");
  }
}

interface POSTProps {
  contact: Omit<Contact, "id">; // Usa Omit per rimuovere 'id' dal tipo
  error: (text: string) => void;
}

export async function POST({ contact, error }: POSTProps) {
  try {
    const res = await addDoc(collectionRef, contact);

    return res.id; // Ritorna id del contatto aggiunto
  } catch (err) {
    if (typeof err === "string") {
      error(err);
    } else {
      error("An error occurred while adding the contact");
    }
    return null; // Ritorna null in caso di errore
  }
}

export async function PUT({ id, contact, error }: ApiProps) {
  try {
    if (!id) {
      throw new Error("Invalid id");
    }

    await setDoc(docRef(id), contact);

    return "Contact updated successfully!";
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Failed to update contact");
  }
}

export async function DELETE({ id, error }: ApiProps) {
  try {
    if (id) {
      await deleteDoc(docRef(id));
    }
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Failed to delete contact");
  }
}
