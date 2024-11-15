// app/api/contacts/routes.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // Importa il client Supabase

// Funzione GET per ottenere tutti i contatti
export async function GET() {
  try {
    // Query per ottenere tutti i contatti dalla tabella 'contacts'
    const { data, error } = await supabase.from("contacts").select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errore durante il recupero dei contatti:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero dei contatti" },
      { status: 500 }
    );
  }
}

// Funzione per la gestione delle richieste POST
export async function POST(req: Request) {
  try {
    const contact = await req.json();

    // Verifica che i campi principali siano presenti
    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.phone ||
      !contact.email
    ) {
      return new Response(JSON.stringify({ error: "Dati mancanti" }), {
        status: 400,
      });
    }

    // Inserisci il contatto nel database usando Supabase
    const { data, error } = await supabase
      .from("contacts") // Assicurati che il nome della tabella sia corretto
      .insert([
        {
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          favorite: contact.favorite || 0, // Impostiamo il valore di default se non presente
        },
      ])
      .select(); // Aggiunto .select() per restituire i dati inseriti;

    // Se c'è un errore nell'inserimento, rispondi con un errore
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    // Rispondi con i dati inseriti
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Errore durante l'aggiunta del contatto" }),
      { status: 500 }
    );
  }
}
