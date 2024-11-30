import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import "../index.css";

function LandingPage() {
  return (
    <>
      <div className="w-screen h-screen scrollable-container">
        <div className="relative">
          <Header />
        </div>
        <Hero />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
