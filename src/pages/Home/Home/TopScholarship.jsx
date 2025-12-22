import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const TopScholarships = () => {
  const axiosPublic = UseAxiosSecure();

  const {
    data: scholarships = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["top-scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-scholarships/home");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Failed to load</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Top Scholarships
        </h2>
        <p className="text-gray-600 mt-2">
          Handpicked opportunities with low fees & recent postings
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((item) => (
          <div
            key={item._id}
            className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-md hover:shadow-xl transition-all"
          >
            {/* Image */}
            <div className="h-44 overflow-hidden rounded-t-2xl">
              <img
                src={item.universityImage}
                alt={item.universityName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.scholarshipName}
              </h3>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaUniversity className="text-indigo-500" />
                {item.universityName}
              </p>

              <p className="flex items-center gap-2 text-sm text-gray-600">
                <FaDollarSign className="text-green-500" />
                Application Fee: ${item.applicationFees}
              </p>

              <Link
                to={`/all-scholarships/${item._id}`}
                className="inline-block w-full text-center mt-4 btn btn-sm bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none hover:opacity-90"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopScholarships;
