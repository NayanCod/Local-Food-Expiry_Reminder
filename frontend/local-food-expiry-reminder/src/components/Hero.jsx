import React from "react";

function Hero() {
  return (
    <div className="bg-blue-600 ">
      <div className="max-w-[85rem] flex flex-col  justify-center items-center gap-y-6 mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8 ">
        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Never Let Food Go to Waste
          </h1>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <p className="text-lg text-white/70">
          Introducing <strong>FreshTrack</strong>, your smart companion for managing food expiry dates. Scan QR codes, track expiry dates, and get timely reminders to ensure nothing goes bad. Simplify your kitchen and reduce waste effortlessly with our intuitive app.
          </p>
        </div>

        <div className="text-center">
          <a
            className="inline-flex justify-center items-center gap-x-3 text-center bg-white shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-blue-500 text-sm font-medium rounded-full focus:outline-none focus:shadow-blue-700/50 py-3 px-6"
            href="#"
          >
            Get started
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
