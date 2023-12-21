import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title:
    "Home | Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project",
  description:
    "Home | Princeton Ethiopian, Eritrean, and Egyptian Miracles of Mary Project",
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
