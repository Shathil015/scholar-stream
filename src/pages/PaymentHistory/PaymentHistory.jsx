import React from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <div>
        <h2>My payments : {paymentHistory.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Index</th>
                <th>University Name</th>

                <th>TransactionId</th>

                <th>Application Fees</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.universityName}</td>

                  <td>{payment.transactionId}</td>

                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
