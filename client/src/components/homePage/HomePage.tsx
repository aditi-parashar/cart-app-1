import React, { Component } from "react";
import ProductsList from "../products/Products";
import { getProductsService } from "../../services/ProductsServices";
import { getCartContentService } from "../../services/CartServices";
import "./HomePage.module.scss";

interface CartItemObject {
  itemId: number;
  product: ProductObject;
  quantity: number;
}

interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {}

interface State {
  cartContent: CartItemObject[];
  productsList: ProductObject[];
}

class HomePage extends Component<Props, State> {
  state: State = {
    cartContent: [],
    productsList: [],
  };

  componentDidMount = () => {
    this.fetchCartContent();
    this.fetchProducts();
  };

  fetchCartContent = () => {
    getCartContentService()
      .then((data) => {
        this.setState({
          cartContent: data,
        });
      })
      .catch((error) => {});
  };

  fetchProducts = () => {
    getProductsService()
      .then((data) => {
        this.setState({
          productsList: data,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { productsList } = this.state;
    return (
      <>
        <div className="jumbotron">
          <ProductsList products={productsList} />
        </div>
      </>
    );
  }
}

export default HomePage;
