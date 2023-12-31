import { useParams } from "react-router-dom";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { updateProduct } from "../../../api/apiServices";
import ProductForm from "../../../component/admin/forms/ProductForm";
import FormStatus from "../../../component/admin/forms/FormStatus";
import MainContainer from "../../../component/admin/new/MainContainer";

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
      setSuccess("Product Edited successfully");
      setShow(true);
      setTimeout(() => {
        setShow(false);
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setIsPending(Pending);
  };

  return (
    <MainContainer title={`Edit Product #${productId}`}>
      <div className="d-flex flex-column">
        <center>
          <img src={data?.imageUrl} alt="" />
        </center>
        <ProductForm
          handleSubmit={handleSubmit}
          isPending={isPending}
          productData={data}
        />
        <FormStatus error={error} success={success} show={show} />
      </div>
    </MainContainer>
  );
};

export default EditProduct;
