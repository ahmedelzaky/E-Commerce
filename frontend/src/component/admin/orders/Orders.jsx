import "./order.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Orders = () => {
  const orderColumns = [
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
      //make it apper like 29 jan 2021
      renderCell: (params) => {
        return <div>{new Date(params.row.orderDate).toUTCString()}</div>;
      },
    },
    {
      field: "arrivalDate",
      headerName: "arrivalDate",
      width: 250,
    },
  ];

  const actionColum = [
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (data) => {
        console.log(data);
        return (
          <div className="cellAction">
            <Link
              to={`/admin/orders/${data.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  const { data: orders } = useAxios("/orders");
  console.log(orders);

  return (
    <div className="orders">
      {orders && (
        <DataGrid
          className="datagrid"
          rows={orders}
          columns={orderColumns.concat(actionColum)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

export default Orders;
