import { useState } from "react";
import { uploadCategory } from "../../../api/Server";
import New from "../../../component/admin/new/New";
import CategoryForm from "../../../component/admin/forms/CategoryForm";
import FormStatus from "../../../component/admin/forms/FormStatus";

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
        <FormStatus error={error} success={success} show={show} />
      </div>
    </New>
  );
};

export default AddCategory;
