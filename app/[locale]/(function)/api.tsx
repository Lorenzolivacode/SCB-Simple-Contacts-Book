import { Contact } from "@/app/(interface)/(types)/contact";

interface ApiProps {
  id?: number;
  contact?: Contact;
  error: (text: string) => void;
}

export async function GET({ id = 0, error }: ApiProps) {
  try {
    const res = await fetch(`/api/contacts/${id === 0 ? "" : id}`);

    if (!res.ok) {
      throw new Error("Failed to get contact");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Error reading contacts");
  }
}

export async function PUT({ id, contact, error }: ApiProps) {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      throw new Error("Failed to update contact");
    }

    const message = await res.json();
    return message;
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Failed to update contact");
  }
}

export async function DELETE({ id, error }: ApiProps) {
  try {
    const res = await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error("Failed to delete contact");
    }

    const message = await res.json();
    return message;
  } catch (err) {
    if (typeof err === "string") error(err);

    error("Failed to delete contact");
  }
}
