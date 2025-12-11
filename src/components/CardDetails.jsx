// import React, { useRef } from "react";
import UseAuth from "../hooks/UseAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const CardDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  // const addModalRef = useRef();

  // const handleModalOpen = () => {
  //   addModalRef.current.showModal();
  // };

  // const handleModalClose = () => {
  //   addModalRef.current.close();
  // };

  const { data: cardDetails = [] } = useQuery({
    queryKey: ["scholarship-details", id],
    enabled: !!id,
    queryFn: async () => {
      const rest = await axiosSecure.get(`allScholarship/${id}`);
      return rest.data;
    },
  });
  return (
    <div className="w-11/12 lg:w-9/12 mx-auto my-12">
      <div className="relative flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
        {/* Image Section */}
        <div className="lg:w-1/2 h-64 lg:h-auto">
          <img
            src={cardDetails.universityImage}
            alt={cardDetails.universityName}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Card Body */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {cardDetails.scholarshipName}
            </h2>

            <p className="text-gray-500 mb-2">
              University:{" "}
              <span className="font-medium">{cardDetails.universityName}</span>
            </p>

            <p className="text-gray-500 mb-6">
              Category:{" "}
              <span className="font-medium">
                {cardDetails.scholarshipCategory}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <p className="px-4 py-2 bg-purple-100 rounded-xl text-purple-700 font-medium">
                Deadline: {cardDetails.applicationDeadline}
              </p>

              <p className="px-4 py-2 bg-green-100 rounded-xl text-green-700 font-medium">
                Tuition Fees: ${cardDetails.tuitionFees}
              </p>

              <p className="px-4 py-2 bg-blue-100 rounded-xl text-blue-700 font-medium">
                Application Fees: ${cardDetails.applicationFees}
              </p>

              <p className="px-4 py-2 bg-yellow-100 rounded-xl text-yellow-700 font-medium">
                Service Charge: ${cardDetails.serviceCharge}
              </p>

              <p className="px-4 py-2 bg-red-100 rounded-xl text-red-700 font-medium col-span-2">
                Posted On: {cardDetails.scholarshipPostDate}
              </p>

              <p className="px-4 py-2 bg-gray-200 rounded-xl text-gray-700 font-medium col-span-2">
                Degree: {cardDetails.degree}
              </p>

              <p className="px-4 py-2 bg-blue-50 rounded-xl text-blue-700 font-medium col-span-2">
                Subject Category: {cardDetails.subjectCategory}
              </p>

              <p className="px-4 py-2 bg-green-50 rounded-xl text-green-700 font-medium col-span-2">
                University Location: {cardDetails.universityCity},{" "}
                {cardDetails.universityCountry}
              </p>

              <p className="px-4 py-2 bg-purple-50 rounded-xl text-purple-700 font-medium col-span-2">
                World Rank: #{cardDetails.universityWorldRank}
              </p>

              <p className="px-4 py-2 bg-orange-100 rounded-xl text-orange-700 font-medium col-span-2">
                Posted By: {cardDetails.postedUserEmail}
              </p>
            </div>
          </div>

          <Link
            to={`/all-scholarships/${id}/applicant-info`}
            className="w-full sm:w-auto btn btn-primary text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
          >
            Apply Now
          </Link>

          {/* Action Button */}
          {/* <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleModalOpen}
              className="w-full sm:w-auto btn btn-primary text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300"
            >
              Apply Now
            </button>

            <dialog
              ref={addModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box rounded-2xl">
                <h3 className="font-bold text-2xl mb-4">
                  Apply for {cardDetails.scholarshipName}
                </h3>

                <p className="mb-6 text-gray-600">
                  Please confirm your application for this scholarship.
                </p>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleModalClose}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>

                  <button className="btn btn-primary">Confirm Apply</button>
                </div>
              </div>
            </dialog>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
