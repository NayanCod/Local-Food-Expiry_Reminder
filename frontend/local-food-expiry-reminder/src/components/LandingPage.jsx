import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

function LandingPage() {
  return (
    <>
      <div className="w-full">
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
