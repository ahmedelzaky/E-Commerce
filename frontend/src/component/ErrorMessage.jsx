import { BiSolidErrorAlt } from "react-icons/bi";
import PropTypes from "prop-types";

const ErrorMessage = ({ children }) => {
  return (
    <>
      <div className="error mt-3">
        <BiSolidErrorAlt className="error-icon" fontSize={"30px"} /> {children}
      </div>
    </>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
