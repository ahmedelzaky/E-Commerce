import { BiSolidErrorAlt } from "react-icons/bi";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ErrorMessage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="error mt-3">
        <BiSolidErrorAlt className="error-icon" fontSize={"30px"} /> {children}
      </div>
    </motion.div>
  );
};

ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ErrorMessage;
