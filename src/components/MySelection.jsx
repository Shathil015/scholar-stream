import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";

const MySelection = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: selection = [], refetch } = useQuery({
    queryKey: ["my-selection", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-checkout-session?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleSelectionDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This selection will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/payment-selection/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Selection removed.", "success");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error",
              err.response?.data?.message || "Delete failed",
              "error"
            );
          });
      }
    });
  };

  return (
    <div>
      <h2>All of my parcels : {selection.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>University Name</th>
              <th>Application Cost</th>
              <th>Payment</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selection.map((select, index) => (
              <tr key={select._id}>
                <th>{index + 1}</th>
                <td>{select.universityName}</td>
                <td>{select.applicationFees}</td>
                <td>
                  {select.paymentStatus === "paid" ? (
                    <span className="text-green-400 btn">Paid</span>
                  ) : (
                    //   <button
                    //     onClick={() => handlePayment(select)}
                    //     className="btn"
                    //     to={`/dashboard/payment/${select._id}`}
                    //   >
                    //     Pay
                    //   </button>
                    <button>Pay</button>
                  )}
                </td>
                <td>{select.deliveryStatus}</td>
                <td>
                  <button className="btn btn-square hover:bg-primary">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-primary mx-2">
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    onClick={() => handleSelectionDelete(select._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelection;
