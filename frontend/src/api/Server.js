import axios from "./axios";


const uploadProduct = async  (formData) => {
  let isPending = true;
  let error = null;

  try {
    const response = await axios.post(
      "/products/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }

    isPending = false;
  } catch (err) {
    console.error("Error uploading product:", err);
    error = "Error uploading product. Please try again.";
    isPending = false;
  }

  return {
    isPending,
    error,
  };
};

export default uploadProduct;
