import "./products.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import LoadingScreen from "../../LoadingScreen";
import ErrorMessage from "../../ErrorMessage";

const Products = () => {
  const productColumns = [
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
  const { data: products, isPending, error } = useAxios("/products");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log(id);
      // axios.delete(`/products/${id}`).then((res) => {
      //   alert("Product has been deleted");
      // });
    }
  };

  const actionColum = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (data) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/product/${data.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(data.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="products">
      <div className="productsTitle">
        Add New Product
        <Link
          to="new"
          className="link"
          style={{ textDecoration: "none" }}
        >
          Add New
        </Link>
      </div>
      {error && <ErrorMessage> {error} </ErrorMessage>}
      {isPending && <LoadingScreen />}
      {products && (
        <DataGrid
          className="datagrid"
          rows={products}
          columns={productColumns.concat(actionColum)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

export default Products;
