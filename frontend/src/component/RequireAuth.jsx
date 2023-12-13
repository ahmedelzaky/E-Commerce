import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return user?.role == role ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  role: PropTypes.string.isRequired,
};

export default RequireAuth;