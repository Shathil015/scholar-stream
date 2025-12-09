import React from "react";
import UseAuth from "../../hooks/UseAuth";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const [user, loading] = UseAuth();

  if (loading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return <div></div>;
};

export default PrivateRoute;
