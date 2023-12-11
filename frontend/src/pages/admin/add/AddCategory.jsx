import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { uploadCategory } from "../../../api/Server";
import ErrorMessage from "../../../component/ErrorMessage";
import { motion } from "framer-motion";
import New from "../../../component/admin/new/New";
import CategoryForm from "../../../component/admin/forms/CategoryForm";

const AddCategory = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const handleSubmit = async (category, file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", JSON.stringify(category));
    setIsPending(true);
    const { Pending, error } = await uploadCategory(formData);
    setError(error);
    if (!error) {
      setSuccess("Category added successfully");
      setShow(true);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } else {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setIsPending(Pending);
  };

  return (
    <New title="Add New Category">
      <div className="d-flex flex-column">
        <CategoryForm handleSubmit={handleSubmit} isPending={isPending} />
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
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    setShow(false);
                    setSuccess(null);
                  }}
                  variant="outline-success"
                >
                  Close me
                </Button>
              </div>
            </Alert>
          </motion.div>
        )}
      </div>
    </New>
  );
};

export default AddCategory;
