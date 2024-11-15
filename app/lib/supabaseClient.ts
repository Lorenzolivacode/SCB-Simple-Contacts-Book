import { createClient } from "@supabase/supabase-js";

// Usa le variabili d'ambiente per gestire le credenziali in modo sicuro
const supabaseUrl = "https://mdehyneenaoxcfsyzfom.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZWh5bmVlbmFveGNmc3l6Zm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NjIwMzYsImV4cCI6MjA0NzIzODAzNn0.Ytgc5LLy5GRaUd0SWZ4aCp8W8qsCPH8d1wUMVslAoxE"; // URL del tuo progetto Supabase

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
