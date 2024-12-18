import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>SCB</title>
      </Head>
      <html lang="it">
        <body>{children}</body>
      </html>
    </>
  );
}
