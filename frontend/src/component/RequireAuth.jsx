import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { USER } from "../api/auth";

const RequireAuth = ({ role }) => {
  const location = useLocation();

  return USER?.role == role ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  role: PropTypes.string.isRequired,
};

export default RequireAuth;
