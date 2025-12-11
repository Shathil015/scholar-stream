import React, { useEffect } from "react";

import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  // const axiosSecure = UseAxiosSecure();
  console.log(sessionId);
  // useEffect(() => {
  //   if (sessionId) {
  //     axiosSecure
  //       .patch(`/payment-success?session_id=${sessionId}`)
  //       .then((res) => {
  //         console.log(res.data);
  //       });
  //   }
  // }, [sessionId, axiosSecure]);
  return (
    <div>
      <h2 className="text-4xl text-green-200">Payment success</h2>
    </div>
  );
};

export default PaymentSuccess;
