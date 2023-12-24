import { useState } from "react";
import uploadProduct from "../../../api/apiServices";
import ProductForm from "../../../component/admin/forms/ProductForm";
import FormStatus from "../../../component/admin/forms/FormStatus";
import MainContainer from "../../../component/admin/new/MainContainer";

const AddProduct = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const handleSubmit = async (product, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product", JSON.stringify(product));
    setIsPending(true);
    const { Pending, error } = await uploadProduct(formData);
    setError(error);
    if (!error) {
      setSuccess("Product added successfully");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setIsPending(Pending);
  };

  return (
    <MainContainer title="Add New Product">
      <div className="d-flex flex-column">
        <ProductForm handleSubmit={handleSubmit} isPending={isPending} />
        <FormStatus error={error} success={success} show={show} />
      </div>
    </MainContainer>
  );
};

export default AddProduct;
