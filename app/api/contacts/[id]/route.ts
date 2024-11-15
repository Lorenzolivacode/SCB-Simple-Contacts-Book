import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // Importa il client Supabase

// Funzione GET per ottenere un contatto tramite ID
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Query per ottenere un contatto specifico tramite l'ID
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .eq("id", id)
      .single(); // Restituisce un solo record

    if (error || !data) {
      return NextResponse.json(
        { error: "Contatto non trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore durante il recupero del contatto:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero del contatto" },
      { status: 500 }
    );
  }
}

// Funzione PUT per aggiornare un contatto tramite ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { firstName, lastName, phone, email, favorite } =
      await request.json();

    // Query per aggiornare un contatto tramite ID
    const { data, error } = await supabase
      .from("contacts")
      .update({ firstName, lastName, phone, email, favorite })
      .eq("id", id)
      .single(); // Restituisce un singolo record aggiornato

    if (error) {
      return NextResponse.json(
        { error: "Contatto non trovato" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Contatto aggiornato con successo",
      data,
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del contatto:", error);
    return NextResponse.json(
      { error: "Errore durante l'aggiornamento del contatto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Verifica che l'ID sia presente
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Elimina il contatto con Supabase
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    // Gestisci eventuali errori di Supabase
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Risposta di successo
    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error: ", err);

    // Gestione degli errori generici
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
