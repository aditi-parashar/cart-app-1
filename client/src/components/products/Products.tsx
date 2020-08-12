import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import dressImage from "../../resources/dress.jpg";

interface ProductsListProps {}

interface ProductObject {
  name: string;
  image: string;
}

interface ProductsListState {
  products: ProductObject[];
}

class ProductsList extends Component<ProductsListProps, ProductsListState> {
  state: ProductsListState = {
    products: [
      { name: "Shoes", image: "shoes.jpg" },
      { name: "Bag", image: "bag.jpg" },
      { name: "Laptop", image: "laptop.jpg" },
      { name: "Headphones", image: "headphones.jpg" },
      { name: "Dress", image: "dress.jpg" },
      { name: "Sunglasses", image: "sunglasses.jpg" },
      { name: "Chair", image: "chair.jpg" },
      { name: "Table", image: "table.jpg" },
    ],
  };

  renderProduct = (productObj: ProductObject) => {
    return (
      <div>
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "60%" }}
            image={require(`../../resources/${productObj.image}`)}
            title={productObj.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {productObj.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        {products.length > 0 ? (
          <div>
            <h3>Our Products</h3>
            <Grid container spacing={7} style={{ padding: 20 }}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  {this.renderProduct(product)}
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div>
            <h3>Loading products...</h3>
          </div>
        )}
      </div>
    );
  }
}

export default ProductsList;
