import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";

const AddScholarship = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    try {
      // Upload image to imgbb
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const imageUrl = imgRes.data.data.url;

      // Prepare scholarship object
      const scholarshipData = {
        ...data,

        universityImage: imageUrl,
        createdBy: user?.email,
        createdAt: new Date(),
      };

      //Confirmation
      const result = await Swal.fire({
        title: "Publish Scholarship?",
        text: "This scholarship will be visible to all users.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, publish it!",
      });

      if (!result.isConfirmed) return;

      // Save to database
      const res = await axiosSecure.post("/scholarships", scholarshipData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Scholarship Added!",
          text: "Your scholarship has been published successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <FaGraduationCap className="text-4xl text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-800">
            Create New Scholarship
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Text Inputs */}
          {[
            ["scholarshipName", "Scholarship Name"],
            ["universityName", "University Name"],
            ["country", "Country"],
            ["city", "City"],
            ["worldRank", "World Rank"],
            ["subjectCategory", "Subject Category"],
            ["scholarshipCategory", "Scholarship Category"],
            ["degree", "Degree"],
            ["tuitionFees", "Tuition Fees (Optional)"],
            ["applicationFees", "Application Fees"],
            ["serviceCharge", "Service Charge"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              {...register(name)}
              placeholder={placeholder}
              className="input input-bordered rounded-lg"
              required={!placeholder.includes("Optional")}
            />
          ))}

          {/* Image Upload */}
          <input
            type="file"
            {...register("image")}
            className="file-input file-input-bordered col-span-full"
            required
          />

          {/* Deadline */}
          <input
            type="date"
            {...register("deadline")}
            className="input input-bordered"
            required
          />

          {/* Admin Email */}
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered bg-gray-100 cursor-not-allowed"
          />

          {/* Submit */}
          <button className="btn col-span-full bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-lg mt-4">
            Publish Scholarship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
