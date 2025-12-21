import { Navigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import useRole from "../../hooks/useRole";
import Loader from "../../components/Loader";
import Forbidden from "../../components/Forbidden";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  const { roleLoading, role } = useRole();

  if (loading || roleLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return <Forbidden />;
  }

  return children;
};

export default AdminRoute;
