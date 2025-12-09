import React, { use } from "react";
import Users from "../../assets/user.png";
import Logo from "../../components/Logo";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("LogOut Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        {" "}
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/all-scholarships">
          <p>All Scholarships</p>
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="">
          <p>Item 3</p>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-white/80 backdrop-blur-md shadow-md border-b border-gray-100 sticky top-0 z-50">
      {/* Left - Logo */}
      <Logo></Logo>
      {/* Center - Menu Links (hidden on mobile) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-gray-700 font-medium space-x-4">
          {links}
        </ul>
      </div>

      {/* Right - User Section / Mobile Menu */}
      <div className="navbar-end mx-4 flex items-center gap-3">
        {/* Dropdown for Mobile */}
        <div className="dropdown dropdown-end lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-gray-600 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white/95 backdrop-blur-sm text-gray-800 rounded-xl mt-3 w-52 p-2 shadow-lg border border-gray-100"
          >
            {links}
          </ul>
        </div>

        {/* Conditional Rendering */}
        {!user ? (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none hover:opacity-90 transition-all"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              tabIndex={0}
              className="peer w-10 h-10 rounded-full border border-gray-300 shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <img
                src={user.photoURL || Users}
                className="w-full h-full object-cover"
              />
            </button>

            <div className="absolute right-0 mt-2 hidden peer-hover:flex peer-focus:flex hover:flex focus-within:flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl p-4 w-44 text-gray-700 z-50 transition-all duration-200">
              <p className="font-medium text-center truncate mb-2">
                {user.displayName || "User"}
              </p>
              <button
                onClick={handleLogOut}
                className="btn btn-sm bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 w-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
