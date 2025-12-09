import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary-gradient rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left text-white space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Unlock Your Future with <br />
            <span className="bg-white bg-clip-text text-transparent">
              ScholarStream
            </span>
          </h1>

          <p className="text-lg md:text-xl opacity-90 max-w-xl">
            Discover thousands of scholarships worldwide and manage all your
            applications in one place — faster, smarter, and stress-free.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <a
              href="/all-scholarships"
              className="btn bg-white text-indigo-600 shadow-lg hover:shadow-xl border-none font-semibold px-8"
            >
              Explore Scholarships
            </a>

            <a
              href="/register"
              className="btn bg-secondary-gradient text-white border-none font-semibold px-8"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
            alt="Scholarship illustration"
            className="w-64 md:w-80 lg:w-[350px] drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
