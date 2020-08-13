import React, { Component } from "react";
import ProductsList from "../products/Products";
import Cart from "../cart/Cart";
import { getProductsService } from "../../services/ProductsServices";
import {
  getCartContentService,
  addToCartService,
  updateCartService,
  deleteFromCartService,
} from "../../services/CartServices";
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

  addToCart = (newCartItem: CartItemObject) => {
    addToCartService(newCartItem)
      .then((data) => {
        const { cartContent } = this.state;
        const newCartContent = [...cartContent];
        newCartContent.push(data);
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  updateCart = (updatedCartItem: CartItemObject) => {
    updateCartService(updatedCartItem)
      .then((data) => {
        const { cartContent } = this.state;
        const newCartContent = [...cartContent];
        const index = newCartContent.findIndex(
          (item) => item.itemId === data.itemId
        );
        newCartContent[index] = data;
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  handleAddToCartClick = (product: ProductObject, quantity: number) => {
    const { cartContent } = this.state;
    const result = cartContent.filter((item) => {
      return item.product.id === product.id;
    });
    if (result.length > 0) {
      const updatedCartItem = {
        itemId: result[0].itemId,
        product: result[0].product,
        quantity: result[0].quantity + quantity,
      };
      this.updateCart(updatedCartItem);
    } else {
      const newCartItem = {
        itemId: cartContent.length + 1,
        product,
        quantity,
      };
      this.addToCart(newCartItem);
    }
  };

  handleDeleteFromCart = (itemId: number) => {
    deleteFromCartService(itemId)
      .then(() => {
        const { cartContent } = this.state;
        const newCartContent = cartContent.filter((item) => {
          return item.itemId !== itemId;
        });
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  render() {
    const { cartContent, productsList } = this.state;
    return (
      <>
        <div className="jumbotron">
          <Cart
            cartContent={cartContent}
            onRemoveClick={this.handleDeleteFromCart}
          />
        </div>
        <div className="jumbotron">
          <ProductsList
            products={productsList}
            onAddToCart={this.handleAddToCartClick}
          />
        </div>
      </>
    );
  }
}

export default HomePage;
