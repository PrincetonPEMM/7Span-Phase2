import { client } from "@/utils/directUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import { readItems } from "@directus/sdk";

export const metadata = {
  title:
    "Home | Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project",
  description:
    "We provide beautifully illuminated African manuscripts and captivating stories about the Virgin Mary created in Ethiopia, Eritrea, and Egypt in the 1200s to the present.",
  openGraph: {
    title:
      "Home | Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project",
    images: [
      "https://cms.ethiopicmary.com/assets/3000720b-978c-481d-804d-2eb653217467",
    ],
  },
};

export default async function RootLayout({ children, params }) {
  let footerData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${params.lang}`
  );
  footerData = await footerData.json();

  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  return (
    <html lang={params.lang}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "PEMM",
              "url": "https://pemm.princeton.edu/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://pemm.princeton.edu/stories?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
              `,
          }}
        />
      </head>
      <body>
        {/* Skip navigation link */}
        <a href="#main-content" className="sr-only sr-only-focusable">
          Skip to main content
        </a>
        <main>
          <div className="relative">
            <Header
              className="absolute inset-x-0"
              lang={params.lang}
              headerData={footerData}
              languages={languages}
            />
            <div className="bg-offWhite-500" id="main-content">
              {children}
            </div>
          </div>
          <Footer footerData={footerData} lang={params.lang} />
        </main>
      </body>
    </html>
  );
}
