import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";
import { FaComment, FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";

const MySelection = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [ratingPoint, setRatingPoint] = useState(5);

  const { data: selection = [], refetch } = useQuery({
    queryKey: ["my-selection", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user.email}`);
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

  // Open modal for a scholarship
  const openReviewModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    setReviewComment("");
    setRatingPoint(5);
    setReviewModalOpen(true);
  };

  // Submit review
  const submitReview = async (e) => {
    e.preventDefault();
    if (!selectedScholarship) return;

    const reviewData = {
      scholarshipId: selectedScholarship._id,
      universityName: selectedScholarship.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint,
      reviewComment,
      reviewDate: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire("Success", "Your review has been submitted!", "success");
      setReviewModalOpen(false);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to submit review",
        "error"
      );
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12">
      <h2 className="text-2xl font-bold mb-4">
        All of my Applications : {selection.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
                <td>${select.amount}</td>
                <td>
                  {select.paymentStatus === "unpaid" ? (
                    <span className="text-green-400 btn btn-xs">Pay</span>
                  ) : (
                    <span className="btn btn-xs">Paid</span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-square" title="View Details">
                    <FaMagnifyingGlass />
                  </button>

                  <button
                    className="btn btn-square"
                    title="Add Review"
                    onClick={() => openReviewModal(select)}
                  >
                    <FaComment />
                  </button>

                  <button
                    onClick={() => handleSelectionDelete(select._id)}
                    className="btn btn-square"
                    title="Delete"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 p-6 relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setReviewModalOpen(false)}
            >
              ✖
            </button>

            <h3 className="text-xl font-bold mb-4">
              Add Review for {selectedScholarship.universityName}
            </h3>

            <form onSubmit={submitReview} className="flex flex-col gap-4">
              <label className="flex flex-col">
                Rating (1-5)
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratingPoint}
                  onChange={(e) => setRatingPoint(Number(e.target.value))}
                  className="input input-bordered mt-1"
                  required
                />
              </label>

              <label className="flex flex-col">
                Your Review
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="textarea textarea-bordered mt-1"
                  rows={4}
                  required
                ></textarea>
              </label>

              <button type="submit" className="btn btn-primary mt-2">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySelection;
