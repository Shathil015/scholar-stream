import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";

const ApprovedModerator = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: approvedModerators = [] } = useQuery({
    queryKey: ["approved-moderators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderators");
      return res.data;
    },
  });

  const handleApproval = (id) => {
    // Handle approval logic here
    console.log("Approved moderator with ID:", id);
  };

  return (
    <div>
      <div>
        <h2>Approved Moderators : {approvedModerators.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Created at</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedModerators.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.displayName}</td>
                  <td>{payment.createdAt}</td>
                  <td>{payment.status}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApproval(payment._id)}
                      className="btn btn-success btn-sm"
                    >
                      <FaUserCheck />
                    </button>
                    <button className="btn btn-success btn-sm">
                      <IoPersonRemoveSharp />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovedModerator;
