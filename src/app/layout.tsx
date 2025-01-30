import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Aquí especificamos el peso (weight) de la fuente, por ejemplo "400" (regular)
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400",  // Peso de la fuente, puedes usar "400", "700", etc.
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Welcome to my Next.js Portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Puedes agregar más elementos meta o enlaces aquí */}
      </head>
      <body
        className={`${roboto.variable} antialiased`}
        style={{ margin: 0 }}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
