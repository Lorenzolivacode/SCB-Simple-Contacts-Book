import type { Metadata } from "next";
import "./globals.css";
import "@/app/[locale]/(css-library-utilities)/library-import.css";
import Header from "./(components)/(Organisms)/Header/Header";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "./(Provider)/ThemeProvider";

export const metadata: Metadata = {
  title: "SCB",
  description: "A simple contacts book",
  icons: {
    icon: "/icon-scb.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang="it">
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main className="relative flex-column gap-50px flex-cross-center m-auto mt-70px overflow-hidden">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
