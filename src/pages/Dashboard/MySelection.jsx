import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
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
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  const handleSelectionDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  //   const handlePayment = async (selection) => {
  //     const paymentInfo = {
  //       cost: selection.applicationFees,
  //       parcelId: selection._id,
  //       senderEmail: selection.userEmail,
  //       parcelName: selection.universityName,
  //     };
  //     const res = await axiosSecure.post(
  //       "/payment-checkout-session",
  //       paymentInfo
  //     );

  //     console.log(res.data.url);
  //     window.location.assign(res.data.url);
  //   };
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
                    <Link
                      className="btn"
                      to={`/dashboard/payment/${select._id}`}
                    >
                      Pay
                    </Link>
                    //   <button
                    //     onClick={() => handlePayment(select)}
                    //     className="btn btn-sm btn-primary text-black"
                    //   >
                    //     Pay
                    //   </button>
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
