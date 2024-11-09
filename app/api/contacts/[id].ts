import { NextApiRequest, NextApiResponse } from "next";
import db from "./../../lib/db";
import { Contact } from "@/app/(interface)/(types)/contact";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { firstName, lastName, phone, email, favorite } = req.body;
    const stmt = db.prepare(
      `UPDATE contacts
      SET firstName = ?, lastName = ?, phone = ?, email = ?, favorite = ?
      WHERE id = ?`
    );
    stmt.run(firstName, lastName, phone, email, favorite ? 1 : 0, Number(id));
    const updatedContact: Contact = {
      id: Number(id),
      firstName,
      lastName,
      phone,
      email,
      favorite,
    };
    res.status(200).json(updatedContact);
    //TODO Gestire casi error
  } else if (req.method === "DELETE") {
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    stmt.run(Number(id));
    res.status(204).end();
    //TODO Gestire casi error
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
