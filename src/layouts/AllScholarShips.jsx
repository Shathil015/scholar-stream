import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../hooks/UseAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { Link } from "react-router";

const AllScholarShips = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["allScholarships", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allScholarship`);
      return res.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <Navbar />

      <div className="text-center my-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          All Scholarships
        </h2>
        <p className="text-gray-600 mt-2">
          Total Scholarships:{" "}
          <span className="font-semibold">{scholarships.length}</span>
        </p>
      </div>

      {/* Uniform Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
        {scholarships.map((scholarShip) => (
          <div
            key={scholarShip._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Image */}
            <img
              src={scholarShip.universityImage}
              alt={scholarShip.universityName}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {scholarShip.universityName}
              </h2>

              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Scholarship:</span>{" "}
                {scholarShip.scholarshipName}
              </p>

              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Category:</span>{" "}
                {scholarShip.scholarshipCategory}
              </p>

              {/* Uniform Button */}
              <Link
                to={`/scholarship/details/${scholarShip._id}`}
                className="mt-auto btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none transition-transform hover:scale-[1.02]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default AllScholarShips;
