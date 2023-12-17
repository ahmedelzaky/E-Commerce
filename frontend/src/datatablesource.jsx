import { Link } from "react-router-dom";
import { deleteCategory, deleteProduct, updateOrderStatus } from "./api/Server";
import { Button } from "@mui/material";

export const customerColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];
export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          <img width={60} height={50} src={params.row.image} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },

  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "stockQuantity",
    headerName: "Quantity",
    width: 100,
  },
];

const handleProdcutDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    // deleteProduct(id);
  }
};

export const productsActionColums = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link
            className="editButton"
            to={`edit/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>

          <div
            className="deleteButton"
            onClick={() => handleProdcutDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerId",
    headerName: "customerId",
    width: 150,
  },
  {
    field: "orderDate",
    headerName: "orderDate",
    width: 250,
    renderCell: (params) => {
      return <div>{new Date(params.row.orderDate).toUTCString()}</div>;
    },
  },
  {
    field: "arrivalDate",
    headerName: "arrivalDate",
    width: 250,
    renderCell: (params) => {
      return <div>{new Date(params.row.arrivalDate).toUTCString()}</div>;
    },
  },
];

export const ordersActionColum = [
  {
    field: "action",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Button variant="outlined">
            <Link
              to={`${params.row.id}`}
              style={{ textDecoration: "none", zIndex: "1000" }}
            >
              View
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const deliveryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerId",
    headerName: "customerId",
    width: 150,
  },
  {
    field: "orderDate",
    headerName: "orderDate",
    width: 250,
    renderCell: (params) => {
      return <div>{new Date(params.row.orderDate).toUTCString()}</div>;
    },
  },
];

const handleOrderStatus = (id, status) => {
  updateOrderStatus(id, status);
};

export const pendingOrderActionColum = [
  {
    field: "action",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Button
            onClick={() => handleOrderStatus(params.row.id, "IN_PROGRESS")}
            variant="outlined"
          >
            Accept
          </Button>
          <Button
            onClick={() => handleOrderStatus(params.row.id, "CANCELLED")}
            variant="outlined"
            color="error"
          >
            Reject
          </Button>
          <Button variant="outlined">
            <Link
              to={`${params.row.id}`}
              style={{ textDecoration: "none", zIndex: "1000" }}
            >
              View
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const inProgressOrderActionColum = [
  {
    field: "action",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Button
            variant="outlined"
            color="success"
            onClick={() => handleOrderStatus(params.row.id, "COMPLETED")}
          >
            Delivered
          </Button>
          <Button
            onClick={() => handleOrderStatus(params.row.id, "CANCELLED")}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button variant="outlined">
            <Link
              to={`${params.row.id}`}
              style={{ textDecoration: "none", zIndex: "1000" }}
            >
              View
            </Link>
          </Button>
        </div>
      );
    },
  },
];

export const ProductsSoldColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 500,
  },
  {
    field: "sold",
    headerName: "SoldQuantity",
    width: 200,
  },
];

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          <img width={60} height={50} src={params.row.imageUrl} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
];

const handleCategoryDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this category?")) {
    // deleteCategory(id);
  }
};

export const categoriesActionColum = [
  {
    field: "action",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link
            className="editButton"
            to={`edit/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>

          <div
            className="deleteButton"
            onClick={() => handleCategoryDelete(params.row.id)}
          >
            Delete
          </div>
        </div>
      );
    },
  },
];
