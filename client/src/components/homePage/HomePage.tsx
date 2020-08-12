import React, { Component } from "react";
import ProductsList from "../products/Products";
import { getCartContent } from "../../services/CartServices";
import "./HomePage.module.scss";

interface Props {}

interface State {
  cartContent: string;
}

class HomePage extends Component<Props, State> {
  state: State = {
    cartContent: "",
  };

  componentDidMount = () => {
    this.updateCartContent();
  };

  updateCartContent = () => {
    getCartContent()
      .then((data) => {
        this.setState({
          cartContent: data,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { cartContent } = this.state;
    return (
      <>
        <div className="jumbotron">
          <ProductsList />
          <p>{cartContent}</p>
        </div>
      </>
    );
  }
}

export default HomePage;
