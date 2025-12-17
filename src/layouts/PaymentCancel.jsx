import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <h2 className="text-3xl text-red">Payment cancel</h2>
      <Link to="/dashboard/my-selection">
        <button className="btn btn-secondary">Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancel;
