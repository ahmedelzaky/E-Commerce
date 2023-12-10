import { useState } from "react";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { uploadCategory } from "../../../api/Server";
import ErrorMessage from "../../../component/ErrorMessage";
import { motion } from "framer-motion";
import New from "../../../component/admin/new/New";

const AddCategory = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const [product, setProduct] = useState({
    name: "",
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", JSON.stringify(product));
    setIsPending(true);
    const { Pending, error } = await uploadCategory(formData);
    setError(error);
    if (!error) {
      setSuccess("Category added successfully");
      setShow(true);
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
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="8" controlId="formTitle">
              <Form.Label>Category name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.title}
                required
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Select Image:</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="product"
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                />
              )}
            </Form.Group>
          </Row>

          <Button
            className="mt-3"
            variant="primary"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </Form>
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
