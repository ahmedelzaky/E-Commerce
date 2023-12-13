import { useLocation, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  console.log(user?.role == role);

  return user?.role == role ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  role: PropTypes.string.isRequired,
};

export default RequireAuth;
