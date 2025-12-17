import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { FaCheckCircle, FaUniversity } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = UseAxiosSecure();
  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <FaCheckCircle className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
          <p className="opacity-90 mt-2">
            Your scholarship application payment has been completed
          </p>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6 text-center">
          {/* Info Card */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <FaUniversity />
              Application Confirmed
            </h2>
            <p className="text-gray-600">
              We’ve received your payment successfully. Your application is now
              under review by the university.
            </p>
          </div>

          {/* Session ID */}
          {sessionId && (
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Transaction ID:</span>
              <br />
              <span className="break-all">{sessionId}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/dashboard/my-selection"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
            >
              View My Applications
            </Link>

            <Link
              to="/"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <BiHomeAlt />
              Go Home
            </Link>
          </div>

          {/* Trust */}
          <p className="text-xs text-gray-400 pt-2">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
