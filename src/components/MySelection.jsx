import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link, useParams } from "react-router";

const MySelection = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: selection = [], refetch } = useQuery({
    queryKey: ["my-selection", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
      return res.data;
    },
  });

  const { data: cardDetails = [] } = useQuery({
    queryKey: ["scholarship-details", id],
    enabled: !!id,
    queryFn: async () => {
      const rest = await axiosSecure.get(`/payment/:id`);
      return rest.data;
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
          .delete(`/payment/${id}`)
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
      <h2>All of my Applications : {selection.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Index</th>
              <th>University Name</th>

              <th>Approval Status</th>
              <th>Application Fees</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {selection.map((select, index) => (
              <tr key={select._id}>
                <th>{index + 1}</th>
                <td>{select.universityName}</td>

                <td>{select.approvedStatus}</td>
                <td>{select.amount}</td>
                <td>
                  {select.paymentStatus === "unpaid" ? (
                    <span className="text-green-400 btn">Pay</span>
                  ) : (
                    <button
                      // onClick={() => handlePayment(select)}
                      className="btn"
                      to={`/all-scholarships/payment/${cardDetails._id}`}
                    >
                      Paid
                    </button>
                  )}
                </td>
                {/* <td>{select.deliveryStatus}</td> */}
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
