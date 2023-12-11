import { useState } from "react";
import { updateCategory } from "../../../api/Server";
import New from "../../../component/admin/new/New";
import CategoryForm from "../../../component/admin/forms/CategoryForm";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import FormStatus from "../../../component/admin/forms/FormStatus";

const EditCategory = () => {
  const { categoryId } = useParams();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(true);

  const { data } = useAxios(`/categories/${categoryId}`);

  const handleSubmit = async (category, file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", JSON.stringify(category));
    setIsPending(true);
    const { Pending, error } = await updateCategory(categoryId, formData);
    setError(error);
    if (!error) {
      setSuccess("Category Edited successfully");
      setShow(true);
      setTimeout(() => {
        setSuccess(null);
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
    <New title={`Edit ${data?.name} Category`}>
      <div className="d-flex flex-column">
        <center>
          <img src={data?.imageUrl} alt="" />
        </center>
        <CategoryForm
          handleSubmit={handleSubmit}
          isPending={isPending}
          categoryData={data}
        />
        <FormStatus error={error} success={success} show={show} />
      </div>
    </New>
  );
};

export default EditCategory;
