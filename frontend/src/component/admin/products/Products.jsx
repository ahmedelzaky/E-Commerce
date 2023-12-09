import "./products.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../dataproducts";
import { Link } from "react-router-dom";
import { useState } from "react";

const Products = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColum = [
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <Link to="/users" style={{ textDecoration: "none" }}>
              <div className="viewButton">Edit</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(data.id)}>
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
          to="/admin/addproduct"
          className="link"
          style={{ textDecoration: "none" }}
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={userColumns.concat(actionColum)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Products;
