import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { Contact } from "@/app/(interface)/(types)/contact";

export async function GET() {
  try {
    const contacts = db.prepare("SELECT * FROM contacts").all() as Contact[];
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error while retrieving contacts" },
      { status: 500 }
    );
  }
}

export async function GETByID(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // Recupera un singolo contatto in base all'ID
      const contact = db
        .prepare("SELECT * FROM contacts WHERE id = ?")
        .get(id) as Contact;

      if (!contact) {
        return NextResponse.json(
          { error: "Contact not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(contact);
    } else {
      // Recupera tutti i contatti
      const contacts = db.prepare("SELECT * FROM contacts").all() as Contact[];
      return NextResponse.json(contacts);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error while retrieving contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, phone, email, favorite } =
      await request.json();
    const stmt = db.prepare(
      `INSERT INTO contacts (firstName, lastName, phone, email, favorite)
       VALUES (?, ?, ?, ?, ?)`
    );
    const info = stmt.run(firstName, lastName, phone, email, favorite);

    const newContact: Contact = {
      id: info.lastInsertRowid as number,
      firstName,
      lastName,
      phone,
      email,
      favorite,
    };

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error entering contact" },
      { status: 500 }
    );
  }
}
