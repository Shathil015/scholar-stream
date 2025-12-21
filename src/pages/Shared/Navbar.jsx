import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Users from "../../assets/user.png";
import Logo from "../../components/Logo";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { role } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => alert("Logged out successfully"))
      .catch(console.error);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Scholarships", path: "/all-scholarships" },

    ...(user
      ? [{ name: "My Applications", path: "/dashboard/my-selection" }]
      : []),
    ...(role === "admin"
      ? [{ name: "Users Management", path: "/dashboard/users-management" }]
      : []),
    ...(role === "moderator"
      ? [
          {
            name: "Moderator Dashboard",
            path: "/dashboard/moderator-dashboard",
          },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Glow border */}
      <div className="h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <nav className="mx-auto max-w-7xl px-4">
        <div className="mt-3 rounded-2xl bg-white/75 backdrop-blur-xl shadow-lg border border-gray-200">
          <div className="navbar min-h-[70px]">
            {/* Logo */}
            <div className="navbar-start">
              <Logo />
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <ul className="flex gap-8 font-medium text-gray-700">
                {navLinks.map((item) => (
                  <li key={item.path} className="relative group">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `px-1 transition ${
                          isActive ? "text-indigo-600" : "hover:text-indigo-500"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>

                    {/* underline */}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="navbar-end gap-3">
              {/* Mobile Menu */}
              <div className="dropdown dropdown-end lg:hidden">
                <label tabIndex={0} className="btn btn-ghost rounded-full">
                  ☰
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-white shadow-xl border border-gray-200"
                >
                  {navLinks.map((item) => (
                    <li key={item.path}>
                      <NavLink to={item.path}>{item.name}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Auth */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="btn btn-sm btn-outline border-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-none"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="cursor-pointer">
                    <div className="w-10 h-10 rounded-full ring-2 ring-indigo-500 ring-offset-2 overflow-hidden">
                      <img
                        src={user.photoURL || Users}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </label>

                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-3 w-52 rounded-xl bg-white shadow-xl border border-gray-200 p-4"
                  >
                    <li className="text-center mb-3">
                      <p className="font-semibold truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="btn btn-sm w-full bg-gray-100 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
