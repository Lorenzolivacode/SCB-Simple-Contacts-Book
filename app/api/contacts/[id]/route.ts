import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { Contact } from "@/app/(interface)/(types)/contact";

// GET - Recupera un singolo contatto tramite ID
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contact = db
      .prepare("SELECT * FROM contacts WHERE id = ?")
      .get(id) as Contact;
    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error while retrieving contacts:", error);
    return NextResponse.json(
      { error: "Error retrieving contact" },
      { status: 500 }
    );
  }
}

// PUT - Aggiorna un contatto tramite ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { firstName, lastName, phone, email, favorite } =
      await request.json();

    const stmt = db.prepare(
      "UPDATE contacts SET firstName = ?, lastName = ?, phone = ?, email = ?, favorite = ? WHERE id = ?"
    );
    const info = stmt.run(firstName, lastName, phone, email, favorite, id);

    if (info.changes === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact updated successfully" });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Error updating contact" },
      { status: 500 }
    );
  }
}

// DELETE - Elimina un contatto tramite ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    const info = stmt.run(id);

    if (info.changes === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact successfully deleted" });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    return NextResponse.json(
      { error: "Error deleting contact" },
      { status: 500 }
    );
  }
}
