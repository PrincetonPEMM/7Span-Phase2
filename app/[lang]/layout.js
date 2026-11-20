import { client } from "@/utils/directUs";
import { readItems } from "@directus/sdk";
import Analytics from "./components/Analytics";
import Footer from "./components/Footer";
import HashScrollHandler from "./components/HashScrollHandler";
import Header from "./components/Header";
import "./globals.css";
import { IS_PRODUCTION, SITE_URL } from "@/utils/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Search engines must not index local, dev or staging.
  robots: IS_PRODUCTION ? undefined : { index: false, follow: false },
  verification: IS_PRODUCTION
    ? {
        google:
          process.env.NEXT_PUBLIC_GSC_VERIFICATION ||
          "gcbj5CxAIBEri8_WeM4Vya8YwOeYycEeshDhWqNnj2k",
        other: process.env.NEXT_PUBLIC_BING_VERIFICATION
          ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
          : undefined,
      }
    : undefined,
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
  const { lang } = await params;
  let languages = await client.request(
    readItems("languages", { fields: ["*.*.*"] })
  );

  let footerData = await fetch(
    `${process.env.NEXT_PUBLIC_DIRECTUS_URL}string_localization?language=${lang}`
  );

  footerData = await footerData.json();

  return (
    <html lang={lang}>
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
        <Analytics />
        <HashScrollHandler />
        {/* Skip navigation link */}
        <a href="#main-content" className="sr-only sr-only-focusable">
          Skip to main content
        </a>
        <main>
          <div className="relative">
            <Header
              className="absolute inset-x-0"
              lang={lang}
              headerData={footerData}
              languages={languages}
            />
            <div className="bg-offWhite-500" id="main-content">
              {children}
            </div>
          </div>
          <Footer footerData={footerData} lang={lang} />
        </main>
      </body>
    </html>
  );
}
