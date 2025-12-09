import React from "react";
import logo from "../assets/Logo.png";

const Logo = () => {
  return (
    <div className="flex items-end ">
      <img className="w-12" src={logo} alt="" />
      <h3 className="text-2xl font-semibold -ms-3 ">
        Scholar<span className="">Stream</span>
      </h3>
    </div>
  );
};

export default Logo;
