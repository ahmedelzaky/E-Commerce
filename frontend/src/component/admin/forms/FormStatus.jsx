import { Alert } from "react-bootstrap";
import ErrorMessage from "../../ErrorMessage";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const FormStatus = ({ error, success, show }) => {
  return (
    <>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Alert show={show} className="mt-3" variant="success">
            <Alert.Heading> {success} </Alert.Heading>
          </Alert>
        </motion.div>
      )}
    </>
  );
};

FormStatus.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
  show: PropTypes.bool,
};

export default FormStatus;
