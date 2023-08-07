import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header className="absolute inset-x-0" />
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
