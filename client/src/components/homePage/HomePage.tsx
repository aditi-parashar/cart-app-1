import React, { Component } from "react";
import ProductsList from "../products/Products";
import { getProductsService } from "../../services/ProductsServices";
import "./HomePage.module.scss";

interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {}

interface State {
  productsList: ProductObject[];
}

class HomePage extends Component<Props, State> {
  state: State = {
    productsList: [],
  };

  componentDidMount = () => {
    this.fetchProducts();
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
