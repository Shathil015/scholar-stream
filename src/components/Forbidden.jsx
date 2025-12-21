import { FaHome, FaShieldAlt, FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-200 rounded-full blur-3xl opacity-40"></div>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
          <FaShieldAlt className="w-8 h-8 text-red-500" />
        </div>

        {/* Status code */}
        <h1 className="text-6xl font-extrabold text-red-500 tracking-wide">
          403
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold mt-3 text-gray-800">
          Access Forbidden
        </h2>

        <p className="text-gray-600 mt-2 leading-relaxed">
          You don’t have permission to view this page. If you believe this is a
          mistake, please contact an administrator.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            <FaHome size={18} />
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <FaTachometerAlt size={18} />
            Dashboard
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-sm text-gray-400">
          Error Code: 403 · Unauthorized Access
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
