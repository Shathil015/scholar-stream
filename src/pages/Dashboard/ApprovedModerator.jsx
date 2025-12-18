import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { FaUserCheck } from "react-icons/fa6";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApprovedModerator = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: approvedModerators = [], refetch } = useQuery({
    queryKey: ["approved-moderators", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/moderators");
      return res.data;
    },
  });

  const updateModeratorStatus = (moderator, status) => {
    const updateInfo = { status: status, email: moderator.email };
    axiosSecure
      .patch(`/moderators/${moderator._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Moderator status is set to ${status}.`,
            showConfirmButton: false,
            timer: 2000,
          });
          refetch();
        }
      });
  };

  const handleDeleteModerator = (moderator) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This moderator will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/moderators/${moderator._id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Moderator has been removed.", "success");
          refetch();
        }
      }
    });
  };

  const handleApproval = (moderator) => {
    updateModeratorStatus(moderator, "approved");
  };

  const handleRejection = (moderator) => {
    updateModeratorStatus(moderator, "rejected");
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
              {approvedModerators.map((modify, index) => (
                <tr key={modify._id}>
                  <th>{index + 1}</th>
                  <td>{modify.displayName}</td>
                  <td>{modify.createdAt}</td>
                  <td>
                    <p
                      className={
                        modify.status === "approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {modify.status}
                    </p>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleApproval(modify)}
                      className="btn btn-success btn-sm"
                    >
                      <FaUserCheck />
                    </button>
                    <button
                      onClick={() => handleRejection(modify)}
                      className="btn btn-error btn-sm"
                    >
                      <IoPersonRemoveSharp />
                    </button>
                    <button
                      onClick={() => handleDeleteModerator(modify)}
                      className="btn btn-error btn-sm"
                    >
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
