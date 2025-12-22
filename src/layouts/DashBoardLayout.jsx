import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../components/Logo";
import {
  MdAddModerator,
  MdOutlineAddModerator,
  MdOutlineHistory,
} from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";
import {
  FaEnvelope,
  FaGoogleScholar,
  FaUsers,
  FaUserShield,
} from "react-icons/fa6";
import useRole from "../hooks/useRole";
import UseAuth from "../hooks/UseAuth";
import { FaHome } from "react-icons/fa";

const DashBoardLayout = () => {
  const { role } = useRole();
  const { user } = UseAuth();

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
     ${
       isActive
         ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
         : "text-gray-300 hover:bg-white/10 hover:text-white"
     }`;

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              ☰
            </label>
            <Logo />
            <span className="text-sm text-gray-500">Dashboard Panel</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="p-5 border-b border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 flex items-center gap-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/2kRkKzJ/user.png"}
                    alt="User"
                    className="w-15 h-15 rounded-full border-4 border-white object-cover"
                  />
                  <div className="text-white">
                    <h2 className="text-1xl font-bold">
                      {user?.displayName || "User"}
                    </h2>
                    <p className="text-sm opacity-90">{user?.email}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-end">
                  <button className="btn btn-outline btn-primary">
                    Edit Profile (Coming Soon)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ul className="menu px-3 py-4 space-y-1">
            {/* USER SECTION */}
            <li className="menu-title text-xs text-gray-400 px-3">USER</li>

            <li>
              <NavLink to="/" className={navStyle}>
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-selection" className={navStyle}>
                <AiFillDatabase />
                My Selection
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/payment-history" className={navStyle}>
                <MdOutlineHistory />
                Payment History
              </NavLink>
            </li>

            {/* ADMIN SECTION */}
            {role === "admin" && (
              <>
                <li className="menu-title text-xs text-gray-400 px-3 mt-4">
                  ADMIN
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approved-moderator"
                    className={navStyle}
                  >
                    <MdOutlineAddModerator />
                    Approved Moderators
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assign-moderator"
                    className={navStyle}
                  >
                    <MdAddModerator />
                    Assign Moderator
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={navStyle}
                  >
                    <FaUsers />
                    Users Management
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/add-scholarship" className={navStyle}>
                    <FaGoogleScholar />
                    Add Scholarship
                  </NavLink>
                </li>
              </>
            )}

            {/* FOOTER */}
            <div className="mt-8 px-4 text-xs text-gray-500">
              © ScholarStream
            </div>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashBoardLayout;
