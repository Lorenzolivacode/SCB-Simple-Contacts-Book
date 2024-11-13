import { Dispatch, SetStateAction } from "react";

export const getCookie = (key: string) => {
  const match = document.cookie.match(new RegExp("(^|)" + key + "=([^;]+)"));
  return match ? match[2] : null;
  //document.cookie.match(...) cerca il cookie specificato. Se trovato, match[2] contiene il valore del cookie; altrimenti, ritorna null.
  //(^| ): l’inizio della stringa oppure uno spazio (indica l’inizio di un cookie).
  //name + '=': il nome del cookie seguito da = per identificare la chiave.
  //([^;]+): uno o più caratteri fino al prossimo ; (il valore del cookie).
};

const setCookie = (key: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  //+ days * 24 * 60 * 60 * 1000 aggiunge alla data corrente il numero di millisecondi che corrisponde ai giorni di durata specificati.

  document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
  //document.cookie permette di creare un nuovo cookie o aggiornare uno esistente.
};

export const handleCookieBoolean = (
  stateToString: string,
  setState: Dispatch<SetStateAction<boolean>>,
  days: number
) => {
  setState((prev: boolean) => {
    const newValue = !prev;
    setCookie(stateToString, newValue.toString(), days);
    return newValue;
  });
};

export const checkCookieBoolean = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>
) => {
  const savedCookie = getCookie(`${state}`);
  if (savedCookie) {
    setState(savedCookie === "true");
  }
};
