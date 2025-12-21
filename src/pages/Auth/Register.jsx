import Logo from "../../components/Logo";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { registerUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();

  const handleRegistration = (data) => {
    const profileImage = data.photo[0];
    registerUser(data.email, data.password).then(() => []);
    const formData = new FormData();
    formData.append("image", profileImage);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;
    axios
      .post(image_API_URL, formData)
      .then((res) => {
        const photoURL = res.data.data.url;

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user info saved");
          }
        });

        const userProfile = {
          displayName: data.name,
          photoURL: photoURL,
        };
        updateUserProfile(userProfile)
          .then(() => {
            // console.log("users profile Updated");
            navigate(location?.state || "/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { signInGoogle } = UseAuth();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.loge(error);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="bg-[#1b1f3b] text-white p-10 flex flex-col justify-center">
          <Logo />

          <p className="text-sm mb-8 opacity-90">
            Register using social media to get quick access
          </p>

          <button className="btn bg-[#1A77F2] text-white border-[#005fd8]">
            Login with Facebook
          </button>
          <button className="btn bg-black text-white border-black my-1">
            Login with GitHub
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            Login with Google
          </button>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>

          <p className="text-sm mb-6">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>

          {/* FORM STARTS */}
          <form onSubmit={handleSubmit(handleRegistration)}>
            {/* NAME */}
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="border rounded-lg w-full p-3 mb-2 focus:ring-2 focus:ring-purple-500"
            />
            {errors.name && (
              <p className="text-red-500 mb-2">Name is required</p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
              className="border rounded-lg w-full p-3 mb-2 focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && (
              <p className="text-red-500 mb-2">Email is required</p>
            )}

            {/* PHOTO URL */}

            <input
              type="file"
              {...register("photo", { required: true })}
              placeholder="Photo URL"
              className="file-input file-input-info border rounded-lg w-full  mb-2 focus:ring-2 focus:ring-purple-500"
            />
            {errors.photo && (
              <p className="text-red-500 mb-2">Photo URL is required</p>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Password must contain 1 uppercase letter & 1 special character",
                },
              })}
              placeholder="Password"
              className="border rounded-lg w-full p-3 mb-4 focus:ring-2 focus:ring-purple-500"
            />

            {/* PASSWORD ERRORS */}
            {errors.password?.type === "required" && (
              <p className="text-red-500 mb-2">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mb-2">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 mb-2">
                Password must contain 1 capital letter & 1 special character
              </p>
            )}

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
