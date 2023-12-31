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
    if (err.response.data) error = err.response.data;
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
    if (err.response.data) error = err.response.data;
    else error = "Error uploading category";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const updateProduct = async (id, formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.put("/products/update/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error updating product:", err);
    console.error("Error response:", err.response);
    if (err.response.data) error = err.response.data;
    else error = "Error updating product";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const updateCategory = async (id, formData) => {
  let isPending = true;
  let error = null;

  try {
    await axios.put("/categories/update/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error("Error updating category:", err);
    console.error("Error response:", err.response);
    if (err.response.data) error = err.response.data;
    else error = "Error updating category";
  }
  isPending = false;

  return {
    isPending,
    error,
  };
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`/products/delete/${id}`);
  } catch (err) {
    console.error("Error deleting product:", err);
    console.error("Error response:", err.response);
  }
  window.location.href = "/admin/products";
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`/categories/delete/${id}`);
  } catch (err) {
    console.error("Error deleting category:", err);
    console.error("Error response:", err.response);
  }
  window.location.reload();
};

export const updateOrderStatus = async (id, status) => {
  try {
    await axios.put(
      `/orders/update-order-status/${id}`,
      {},
      {
        params: {
          status: status,
        },
      }
    );
  } catch (err) {
    console.error("Error updating order status:", err);
    console.error("Error response:", err.response);
  }
  window.location.reload();
};

export default uploadProduct;
