import { MdOutlineVerified } from "react-icons/md";
import { motion } from "framer-motion";

const AddedPopup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <div className="added-popup">
        <MdOutlineVerified color="green" size={25} />
        <p> Product Added To Cart </p>
      </div>
    </motion.div>
  );
};

export default AddedPopup;
