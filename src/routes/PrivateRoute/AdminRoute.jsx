import React from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

import useRole from "../../hooks/useRole";
import Loader from "../../components/Loader";
import Forbidden from "../../components/Forbidden";

const AdminRoute = () => {
  const { user, loading } = UseAuth();

  const { roleLoading, role } = useRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }
  if (role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return <div></div>;
};

export default AdminRoute;
