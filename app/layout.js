import { client } from "@/utils/directUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { readItems } from "@directus/sdk";
export const metadata = {
  title: "Pemmtastic",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <main>
          <div className="relative">
            <Header className="absolute inset-x-0" />
            <div className="bg-background-500">{children}</div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
