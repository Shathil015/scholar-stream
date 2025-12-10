import { useParams } from "react-router";
import UseAuth from "../hooks/UseAuth";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ApplicantInfo = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { register, handleSubmit } = useForm();

  // Fetch scholarship information
  const { data: scholarship = {} } = useQuery({
    queryKey: ["scholarship-info", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allScholarship/${id}`);
      return res.data;
    },
  });

  const handleApplicationSubmit = (formData) => {
    const applicationData = {
      scholarshipId: id,
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      degree: scholarship.degree,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
      applicationStatus: "pending",
      paymentStatus: "unpaid",
      feedback: "",
      applicationDate: new Date().toISOString().split("T")[0],

      // user-filled fields
      phone: formData.phone,
      address: formData.address,
      qualification: formData.qualification,
      documentLink: formData.documentLink,
    };

    Swal.fire({
      title: "Confirm your application?",
      text: `You will be charged $${scholarship.applicationFees} + service charge $${scholarship.serviceCharge}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/applications", applicationData).then(() => {
          Swal.fire(
            "Success!",
            "Application Submitted Successfully",
            "success"
          );
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-14 mb-20">
      <div className="p-10 rounded-3xl shadow-2xl bg-white/70 backdrop-blur-lg border border-gray-200">
        {/* HEADER */}
        <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-10">
          Scholarship Application Form
        </h2>

        <form
          onSubmit={handleSubmit(handleApplicationSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* LEFT SIDE: USER INFO */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-2xl shadow-inner border">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Your Information
            </h3>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full mt-1 rounded-xl"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full mt-1 rounded-xl"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                {...register("phone")}
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <input
                type="text"
                placeholder="Your complete address"
                {...register("address")}
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Qualification
              </label>
              <input
                type="text"
                placeholder="HSC / Bachelor / Masters"
                {...register("qualification")}
                className="input input-bordered w-full mt-1 rounded-xl"
                required
              />
            </div>

            {/* Document Link */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Document / Portfolio Link
              </label>
              <input
                type="text"
                placeholder="Drive link or portfolio (optional)"
                {...register("documentLink")}
                className="input input-bordered w-full mt-1 rounded-xl"
              />
            </div>
          </div>

          {/* RIGHT SIDE: SCHOLARSHIP INFO */}
          <div className="space-y-6 bg-indigo-50 p-6 rounded-2xl shadow-inner border">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Scholarship Information
            </h3>

            {/* University */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                University Name
              </label>
              <input
                type="text"
                defaultValue={scholarship.universityName}
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Scholarship Category
              </label>
              <input
                type="text"
                defaultValue={scholarship.scholarshipCategory}
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                defaultValue={scholarship.degree}
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>

            {/* Application Fee */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Application Fee
              </label>
              <input
                type="text"
                defaultValue={`$${scholarship.applicationFees}`}
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>

            {/* Service Charge */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Service Charge
              </label>
              <input
                type="text"
                defaultValue={`$${scholarship.serviceCharge}`}
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Application Status
              </label>
              <input
                type="text"
                defaultValue="pending"
                readOnly
                className="input input-bordered w-full mt-1 bg-white rounded-xl"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="btn btn-primary md:col-span-2 mt-6 text-lg py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantInfo;
