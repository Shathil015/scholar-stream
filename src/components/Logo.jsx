import React from "react";
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <div className="flex items-end ">
      <img className="w-15" src={logo} alt="" />
      <h3 className="text-2xl font-semibold -ms-5 ">
        Scholar<span className="text-green-300">Stream</span>
      </h3>
    </div>
  );
};

export default Logo;
