import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";
import { Contact } from "@/app/(interface)/(types)/contact";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  debugger;
  if (req.method === "GET") {
    const contacts: Contact[] = db
      .prepare("SELECT * FROM contacts")
      .all() as Contact[]; //Vuole confermato il tipo presente nella locazione di memoria assegnata
    res.status(200).json(contacts);
    //TODO Gestire casi error
  } else if (req.method === "POST") {
    try {
      const { firstName, lastName, phone, email } = req.body;
      const stmt = db.prepare(
        `INSERT INTO contacts (firstName, lastName, phone, email, favorite)
        VALUES (?, ?, ?, ?, 0)`
      );
      const info = stmt.run(firstName, lastName, phone, email);
      const newContact: Contact = {
        id: info.lastInsertRowid as number,
        firstName,
        lastName,
        phone,
        email,
        favorite: false,
      };
      res.status(201).json(newContact); // Risposta JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Errore durante l'inserimento del contatto", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
