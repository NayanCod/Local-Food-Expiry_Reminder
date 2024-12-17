import { Link } from "react-router-dom";

function Hero() {
  const isAuthenticated = !!localStorage.getItem("jwtToken");
  return (
    <div className="bg-blue-600 text-white mt-0 md:mt-3.5">
  <div className="max-w-[85rem] flex flex-col justify-center items-center gap-y-6 mx-auto px-4 sm:px-6 lg:px-8 py-24">
    {/* Hero Heading */}
    <div className="max-w-3xl text-center mx-auto">
      <h1 className="font-extrabold text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
        Never Let Your Item <br /> Go to <span className="text-green-400">Waste</span>
      </h1>
    </div>

    {/* Hero Description */}
    <div className="max-w-3xl text-center mx-auto">
      <p className="text-lg text-white/80 leading-relaxed">
        Introducing <strong className="text-green-400">FreshTrack</strong>, your smart companion for managing items expiry dates. 
        Track expiry dates, and get timely reminders to ensure nothing goes bad. 
        Simplify your kitchen and reduce waste effortlessly with our intuitive app.
      </p>
    </div>

    {/* Call-to-Action Button */}
    <div className="text-center">
      <Link
        to={isAuthenticated ? "/home" : "/login"}
        className="inline-flex items-center gap-x-3 bg-white text-blue-600 text-sm font-semibold hover:shadow-lg rounded-full px-6 py-3 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition duration-300"
      >
        Get started
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </Link>
    </div>
  </div>
</div>

  );
}

export default Hero;
