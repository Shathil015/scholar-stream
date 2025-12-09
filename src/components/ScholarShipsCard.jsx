import React from "react";
import { Link } from "react-router";

const ScholarShipsCard = ({ scholarships }) => {
  const [
    _id,
    universityImage,
    scholarshipName,
    universityName,
    scholarshipCategory,
  ] = scholarships;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow rounded-2xl w-full sm:w-72 md:w-80 lg:w-96 mx-auto mt-5 transform hover:-translate-y-1 hover:scale-105 duration-300">
      {/* Artwork Image */}
      <figure className="px-4 pt-4">
        <img
          src={universityImage}
          className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl border border-gray-100 shadow-sm"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        <h2 className="card-title font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
          {universityName}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-1">
          <span className="font-semibold">Scholarship Name :</span>{" "}
          {scholarshipName}
        </p>

        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          <span className="font-semibold">Category:</span> {scholarshipCategory}
        </p>

        {/* Card Actions */}
        <div className="card-actions mt-4">
          <Link
            to={`/auth/artDetails/${_id}`}
            className="btn btn-primary btn-sm sm:btn-md md:btn-lg w-full transition-transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarShipsCard;
