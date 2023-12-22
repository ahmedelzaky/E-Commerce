import "./ProductDetailsAdmin.css";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ErrorMessage from "../../../component/ErrorMessage";
import LoadingScreen from "../../../component/LoadingScreen";
import { Col, Row, Table } from "react-bootstrap";
import MainContainer from "../../../component/admin/new/MainContainer";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteProduct } from "../../../api/Server";

const ProductDetailsAdmin = () => {
  const { productId } = useParams();
  const {
    data: product,
    isPending,
    error,
  } = useAxios(`/products/${productId}`);

  const { data: priceHistory } = useAxios(
    `/products/price-history/${productId}`
  );
  console.log(priceHistory);

  return (
    <MainContainer title={`Product #${productId}`}>
      {isPending && <LoadingScreen />}
      {error && <ErrorMessage> {error} </ErrorMessage>}
      <div className="product-details-admin">
        {product && (
          <Row>
            <Col>
              <img
                className="product-img"
                src={product.image}
                alt={product.title}
              />{" "}
            </Col>
            <Col className="product-info">
              <h2 className="product-title"> {product.title} </h2>
              <h4 className="product-price"> ${product.price} </h4>
              <p className="product-category">{product.category} </p>

              <p
                className={
                  product.stockQuantity > 10
                    ? "in-stock"
                    : product.stockQuantity
                    ? "med-stock"
                    : "out-stock"
                }
              >
                StockQuantity: {product.stockQuantity}
              </p>

              <p className="product-description"> {product.description} </p>
            </Col>
          </Row>
        )}
        {priceHistory?.length ? (
          <TableContainer component={Paper} className="table">
            <center>
              <h4>Price History</h4>
            </center>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">Price</TableCell>
                  <TableCell className="tableCell">Modify Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {priceHistory?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell" component="th" scope="row">
                      {row.price}
                    </TableCell>
                    <TableCell className="tableCell" component="th" scope="row">
                      {new Date(row.date).toUTCString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
        {product && (
          <div className="actions">
            <Button
              variant="outlined"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this product?"
                  )
                ) {
                  // deleteProduct(productId);
                }
              }}
              color="error"
            >
              Delete
            </Button>
            <Button variant="outlined">
              <Link
                style={{ textDecoration: "none", zIndex: 1000 }}
                to={`/admin/Products/edit/${productId}`}
              >
                Edit
              </Link>
            </Button>
          </div>
        )}
      </div>
    </MainContainer>
  );
};

export default ProductDetailsAdmin;
