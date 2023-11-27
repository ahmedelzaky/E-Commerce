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
    error = err.response.data.message;
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export default uploadProduct;
