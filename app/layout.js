import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title:
    "Home | Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project",
  description:
    "We provide beautifully illuminated African manuscripts and captivating stories about the Virgin Mary created in Ethiopia, Eritrea, and Egypt in the 1200s to the present.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        {/* Skip navigation link */}
        <a href="#main-content" className="sr-only sr-only-focusable">
          Skip to main content
        </a>
        <main>
          <div className="relative">
            <Header className="absolute inset-x-0" />
            <div className="bg-offWhite-500" id="main-content">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
