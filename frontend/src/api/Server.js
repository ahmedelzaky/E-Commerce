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
    if (err.response.data.message.length) error = err.response.data.message;
    else error = "Error uploading product";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const uploadCategory = async (formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.post("/categories/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error uploading category:", err);
    console.error("Error response:", err.response);
    if (err.response.data.message.length) error = err.response.data.message;
    else error = "Error uploading category";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const updateProduct = async (formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.put("/products/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error updating product:", err);
    console.error("Error response:", err.response);
    if (err.response.data.message.length) error = err.response.data.message;
    else error = "Error updating product";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const updateCategory = async (formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.put("/categories/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error updating category:", err);
    console.error("Error response:", err.response);
    if (err.response.data.message.length) error = err.response.data.message;
    else error = "Error updating category";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export default uploadProduct;
