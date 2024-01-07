import { MdOutlineVerified } from "react-icons/md";
import { motion } from "framer-motion";
import { useRef } from "react";

const AddedPopup = () => {
  const ref = useRef(null);

  setTimeout(() => {
    if (ref.current) ref.current.style.display = "none";
  }, 1000);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="added-popup"
    >
      <MdOutlineVerified color="green" size={25} />
      <p> Product Added To Cart </p>
    </motion.div>
  );
};

export default AddedPopup;
