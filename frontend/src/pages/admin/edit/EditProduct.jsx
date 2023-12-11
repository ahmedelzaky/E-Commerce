import { useParams } from "react-router-dom";
import New from "../../../component/admin/new/New";
import { Alert, Button } from "react-bootstrap";
import ErrorMessage from "../../../component/ErrorMessage";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { updateProduct } from "../../../api/Server";
import { motion } from "framer-motion";
import ProductForm from "../../../component/admin/forms/ProductForm";

const EditProduct = () => {
  const { productId } = useParams();

  const { data } = useAxios(`/products/native/${productId}`);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const handleSubmit = (product, file) => {
    handleUpload(product, file);
  };

  const handleUpload = async (product, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product", JSON.stringify(product));
    setIsPending(true);
    const { Pending, error } = await updateProduct(product.id, formData);
    setError(error);
    if (!error) {
      setSuccess("Product added successfully");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        window.location.reload();
      }, 3000);
    } else {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setIsPending(Pending);
  };

  return (
    <New title={`Edit Product #${productId}`}>
      <div className="d-flex flex-column">
        <div className="left">
          <img
            src={data?.imageUrl}
            alt=""
            style={{
              width: "400px",
              height: "400px",
              objectFit: "fill",
              borderRadius: "0",
            }}
          />
        </div>
        <ProductForm
          handleSubmit={handleSubmit}
          isPending={isPending}
          productData={data}
        />
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

export default EditProduct;
