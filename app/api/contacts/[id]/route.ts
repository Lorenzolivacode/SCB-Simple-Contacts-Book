import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { Contact } from "@/app/(interface)/(types)/contact";

// GET - Recupera un singolo contatto tramite ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contact = db
      .prepare("SELECT * FROM contacts WHERE id = ?")
      .get(params.id) as Contact;
    if (!contact) {
      return NextResponse.json(
        { error: "Contatto non trovato" },
        { status: 404 }
      );
    }
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { error: "Errore durante il recupero del contatto" },
      { status: 500 }
    );
  }
}

// PUT - Aggiorna un contatto tramite ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { firstName, lastName, phone, email, favorite } =
      await request.json();

    const stmt = db.prepare(
      "UPDATE contacts SET firstName = ?, lastName = ?, phone = ?, email = ?, favorite = ? WHERE id = ?"
    );
    const info = stmt.run(
      firstName,
      lastName,
      phone,
      email,
      favorite,
      params.id
    );

    if (info.changes === 0) {
      return NextResponse.json(
        { error: "Contatto non trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Contatto aggiornato con successo" });
  } catch {
    return NextResponse.json(
      { error: "Errore durante l'aggiornamento del contatto" },
      { status: 500 }
    );
  }
}

// DELETE - Elimina un contatto tramite ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    const info = stmt.run(params.id);

    if (info.changes === 0) {
      return NextResponse.json(
        { error: "Contatto non trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Contatto eliminato con successo" });
  } catch {
    return NextResponse.json(
      { error: "Errore durante l'eliminazione del contatto" },
      { status: 500 }
    );
  }
}
