import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { FaGraduationCap } from "react-icons/fa6";
import { BiBuilding, BiBuildingHouse, BiCreditCard } from "react-icons/bi";
import { FcGraduationCap } from "react-icons/fc";
import UseAuth from "../hooks/UseAuth";

const Payment = () => {
  const { user } = UseAuth();
  const { selectId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { isLoading, data: selection = [] } = useQuery({
    queryKey: ["selection", selectId],
    queryFn: async () => {
      // Fetch selection/payment details if needed
      const res = await axiosSecure.get(`allScholarship/${selectId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: selection.applicationFees,
      scholarshipId: selection._id,
      userEmail: user?.email,
      universityName: selection.universityName,
      universityCountry: selection.universityCountry,
      scholarshipName: selection.scholarshipName,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FaGraduationCap className="w-7 h-7" />
            Scholarship Application Payment
          </h1>
          <p className="opacity-90">
            Secure payment for your selected university application
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* University Card */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-2xl">
            <img
              src={selection.universityImage}
              alt={selection.universityName}
              className="w-32 h-24 object-cover rounded-xl shadow"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selection.universityName}
              </h2>
              <p className="text-gray-500 flex items-center gap-1">
                <BiBuildingHouse className="w-4 h-4" />
                {selection.universityCity}, {selection.universityCountry}
              </p>
              <p className="text-gray-500 flex items-center gap-1">
                <FcGraduationCap className="w-4 h-4" />
                {selection.scholarshipName}
              </p>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Payment Breakdown
            </h3>

            <div className="flex justify-between text-gray-600">
              <span>Application Fee</span>
              <span>${selection.applicationFees}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Service Charge</span>
              <span>${selection.serviceCharge || 0}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Payable</span>
              <span>
                $
                {Number(selection.applicationFees) +
                  Number(selection.serviceCharge || 0)}
              </span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Pay
          </button>

          {/* Trust Text */}
          <p className="text-center text-sm text-gray-500">
            🔒 Secure payment powered by Stripe. Your information is safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
