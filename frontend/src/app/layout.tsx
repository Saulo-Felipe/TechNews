import "@/app/globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header/Header";


export const metadata: Metadata = {
  title: "TechNews - Noticias",
  description: "Noticias diares sobre tecnologia",
  icons: "/technews-favicon.ico"
};


export default function RootLayout(props: {children: React.ReactNode}) {

  return (
    <html lang="pt-br">
      <body className="bg-slate-100">
        <Header />
        <main className="border p-16 px-24">
          {props.children}
        </main>
      </body>
    </html>
  );
}
