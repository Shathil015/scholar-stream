import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Payment = () => {
  const { selectId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { isLoading, data: selection = [] } = useQuery({
    queryKey: ["selection", selectId],
    queryFn: async () => {
      // Fetch selection/payment details if needed
      const res = await axiosSecure.get(`/applications/${selectId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: selection.applicationFees,
      parcelId: selection._id,
      senderEmail: selection.userEmail,
      parcelName: selection.universityName,
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
    <div>
      <h2>
        Please pay ${selection.applicationFees} for complete application of{" "}
        {selection.universityName}
      </h2>
      <button onClick={handlePayment} className="btn btn-secondary">
        Pay
      </button>
    </div>
  );
};

export default Payment;
