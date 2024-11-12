import type { Metadata } from "next";
import "./globals.css";
import "@/app/[locale]/(css-library-utilities)/library-import.css";
import Header from "./(components)/(Organisms)/Header/Header";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "SCB",
  description: "A simple contacts book",
  icons: {
    icon: "/icon-scb.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({ locale });

  return (
    <html lang="it">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-column gap-50px flex-cross-center p-20px p-t-40px m-auto overflow-hidden">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
