import React from "react";
import { FaGraduationCap, FaGlobe, FaUsers } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-8 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Unlock Your Future with{" "}
              <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent animate-pulse">
                ScholarStream
              </span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-xl">
              Discover verified scholarships worldwide and manage applications
              seamlessly — all in one powerful platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/all-scholarships"
                className="btn bg-white text-indigo-600 px-8 font-semibold shadow-xl hover:scale-105 transition"
              >
                Explore Scholarships
              </a>

              <a
                href="/register"
                className="btn bg-black/20 backdrop-blur border border-white/30 text-white px-8 font-semibold hover:bg-black/30 transition"
              >
                Get Started Free
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-yellow-300" />
                <span className="font-semibold">5K+ Scholarships</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-green-300" />
                <span className="font-semibold">40+ Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-300" />
                <span className="font-semibold">20K+ Students</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            {/* Glass Card */}
            <div className="absolute -inset-4 rounded-3xl bg-white/20 blur-xl"></div>

            <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="Scholarship illustration"
                className="w-64 md:w-80 drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
