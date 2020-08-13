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

/* Interface for a Cart Item Type Object */
interface CartItemObject {
  itemId: number;
  product: ProductObject;
  quantity: number;
}

/* Interface for a Product Type Object */
interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

/* Interface for Props for class HomePage */
interface Props {}

/* Interface for State for class HomePage */
interface State {
  cartContent: CartItemObject[];
  productsList: ProductObject[];
}

class HomePage extends Component<Props, State> {
  state: State = {
    cartContent: [],
    productsList: [],
  };

  /* Fetch cart items and products from server upon mounting */
  componentDidMount = () => {
    this.fetchCartContent();
    this.fetchProducts();
  };

  /**
   * This function calls an API service
   * to fetch all cart items from the server
   */
  fetchCartContent = () => {
    getCartContentService()
      .then((data) => {
        this.setState({
          cartContent: data,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function calls an API service
   * to fetch all products from the server
   */
  fetchProducts = () => {
    getProductsService()
      .then((data) => {
        this.setState({
          productsList: data,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function calls an API service
   * to add a new item to the cart; Updates the state
   * @param {object} newCartItem is the new item which needs to be added in the cart.
   */
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

  /**
   * This function calls an API service
   * to update an existing item in the cart; Updates the state
   * @param {object} updatedCartItem is the cart item which needs to be updated.
   */
  updateCart = (updatedCartItem: CartItemObject) => {
    updateCartService(updatedCartItem)
      .then((data) => {
        const { cartContent } = this.state;
        const newCartContent = [...cartContent];

        /* Find the index of the old item */
        const index = newCartContent.findIndex(
          (item) => item.itemId === data.itemId
        );

        /* Replace the index data with the updated item */
        newCartContent[index] = data;

        /* Update state with the new data */
        this.setState({
          cartContent: newCartContent,
        });
      })
      .catch((error) => {});
  };

  /**
   * This function handles all 'Add to Cart' requests from the product card.
   * @param {object} product is the product which is being added.
   * @param {number} quantity is the selected quantity.
   */
  handleAddToCartClick = (product: ProductObject, quantity: number) => {
    const { cartContent } = this.state;

    /* Search if the added product already exists in the cart */
    const result = cartContent.filter((item) => {
      return item.product.id === product.id;
    });

    if (result.length > 0) {
      /* If the product exists in the cart */
      const updatedCartItem = {
        itemId: result[0].itemId,
        product: result[0].product,
        quantity: result[0].quantity + quantity,
      };

      /* Update the cart to reflect the new quantity in an existing item */
      this.updateCart(updatedCartItem);
    } else {
      /* If the product is not found in the cart */
      const newCartItem = {
        itemId: cartContent.length + 1,
        product,
        quantity,
      };

      /* Add the product in the cart as a new item */
      this.addToCart(newCartItem);
    }
  };

  /**
   * This function handles all 'Remove' requests from the Cart item actions.
   * It calls the API service to remove an item from the cart and updates the state.
   * @param {number} itemId is the id of the item which needs to be removed from the cart.
   */
  handleDeleteFromCart = (itemId: number) => {
    deleteFromCartService(itemId)
      .then(() => {
        const { cartContent } = this.state;

        /* Include all items to the new data except the deleted one */
        const newCartContent = cartContent.filter((item) => {
          return item.itemId !== itemId;
        });

        /* Update the state with the new data */
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
