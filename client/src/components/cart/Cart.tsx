import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CartItemObject {
  itemId: number;
  product: ProductObject;
  quantity: number;
}

interface Props {
  cartContent: CartItemObject[];
  onRemoveClick: (itemId: number) => void;
}

interface State {}

class Cart extends Component<Props, State> {
  render() {
    const { cartContent, onRemoveClick } = this.props;
    return (
      <Grid item xs={12}>
        <Typography variant="h6">Your Cart:</Typography>
        {cartContent.length > 0 ? (
          <TableContainer style={{ marginTop: "20px" }} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>No.</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Product</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Price Per Item</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Final Price</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartContent.map((item, index) => {
                  const price = parseFloat(item.product.price);
                  let pricePerItem = "Error loading price";
                  let finalPrice = 0;
                  if (!isNaN(price)) {
                    pricePerItem = price.toString();
                    finalPrice = price * item.quantity;
                  }
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="right">{item.product.name}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{pricePerItem}</TableCell>
                      <TableCell align="right">{finalPrice}</TableCell>
                      <TableCell style={{ color: "#f15a4f" }} align="center">
                        <Button
                          color="inherit"
                          size="small"
                          onClick={() => {
                            onRemoveClick(item.itemId);
                          }}
                        >
                          <b>REMOVE</b>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Grid item xs={12}>
            <TableContainer style={{ marginTop: "20px" }} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>No.</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Product</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Price Per Item</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Final Price</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <b>Your cart is empty.</b>
            </div>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default Cart;
