import { useQuery } from "@tanstack/react-query";
import UseAuth from "../hooks/UseAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

import { Link } from "react-router";
import { useState } from "react";

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

  const [searchTerm, setSearchTerm] = useState("");

  const [subjectCategory, setSubjectCategory] = useState("");

  const filteredScholarships = scholarships.filter((item) => {
    const matchesSearch =
      item.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.degree.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubjectCategory =
      !subjectCategory || item.subjectCategory === subjectCategory;

    return matchesSearch && matchesSubjectCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center my-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          All Scholarships
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Search, filter, and explore global scholarship opportunities
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name, university, degree…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full text-sm"
          />

          {/* Subject Category Filter */}
          <select
            value={subjectCategory}
            onChange={(e) => setSubjectCategory(e.target.value)}
            className="select select-bordered w-full text-sm"
          >
            <option value="">All Subject Categories</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Medical">Medical</option>
          </select>

          {/* Country Filter — optional, but recommended */}
        </div>
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16">
        {filteredScholarships.map((scholarShip) => (
          <div
            key={scholarShip._id}
            className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={scholarShip.universityImage}
                alt={scholarShip.universityName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Badge */}
              <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {scholarShip.scholarshipCategory}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                {scholarShip.universityName}
              </h2>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Scholarship:</span> <br />
                {scholarShip.scholarshipName}
              </p>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Location:</span> <br />
                {scholarShip.universityCity}, {scholarShip.universityCountry}
              </p>

              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Application Fee:</span> <br />
                {scholarShip.applicationFees}
              </p>

              {/* Button */}
              <Link
                to={`/all-scholarships/${scholarShip._id}`}
                className="mt-auto w-full py-2 text-center text-white font-medium rounded-xl bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-[1.02]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarShips;
