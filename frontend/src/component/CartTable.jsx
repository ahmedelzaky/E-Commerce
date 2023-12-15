import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAxios from "../hooks/useAxios";
import PropTypes from "prop-types";

const CartTable = ({ orderId }) => {
  const { data: cart } = useAxios(`/cart/${orderId}`);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID </TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Product Title</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="tableCell">#{item.id}</TableCell>
              <TableCell className="tableCell">
                <img
                  src={item.image}
                  style={{ height: "60px", width: "60px" }}
                  alt=""
                />
              </TableCell>
              <TableCell className="tableCell">{item.title}</TableCell>
              <TableCell className="tableCell">{item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CartTable.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default CartTable;
