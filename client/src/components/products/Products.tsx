import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";

interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {
  products: ProductObject[];
}

class ProductsList extends Component<Props> {
  handleAddToCartClick = (product: ProductObject, quantity: number) => {};

  render() {
    const { products } = this.props;
    return (
      <div>
        {products.length > 0 ? (
          <div>
            <h3>Our Products</h3>
            <Grid container spacing={7} style={{ padding: 20 }}>
              {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} lg={4} xl={3}>
                  <ProductCard
                    product={product}
                    onAddToCart={this.handleAddToCartClick}
                  />
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
