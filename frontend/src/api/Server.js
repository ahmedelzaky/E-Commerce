import axios from "./axios";

const uploadProduct = async (formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.post("/products/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error uploading product:", err);
    console.error("Error response:", err.response);
    if (err.response.data.message) error = err.response.data.message;
    else error = "Error uploading product";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export default uploadProduct;
