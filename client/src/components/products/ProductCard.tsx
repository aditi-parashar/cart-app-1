import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import NoProductImage from "../../resources/NoProductImage.jpg";

interface ProductObject {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface Props {
  product: ProductObject;
  onAddToCart: (product: ProductObject, quantity: number) => void;
}

const ProductCard = (props: Props) => {
  const { product, onAddToCart } = props;
  const [quantity, setQuantity] = useState(1);
  let imgSrc = "";

  try {
    imgSrc = require(`../../resources/${product.image}`);
  } catch (e) {
    imgSrc = NoProductImage;
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Card>
      <CardMedia
        style={{ height: 0, paddingTop: "60%" }}
        image={imgSrc}
        title={product.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {product.name}
        </Typography>
        <Typography component="p">
          <b>Price: Rs. {product.price}</b>
        </Typography>
        <div style={{ marginTop: "7px" }}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <div style={{ marginTop: "3px", marginRight: "10px" }}>
              Quantity: <b>{quantity}</b>
            </div>
            <Button onClick={decrementQuantity}> - </Button>
            <Button onClick={incrementQuantity}> + </Button>
          </ButtonGroup>
          <Button
            style={{ float: "right" }}
            size="small"
            color="primary"
            onClick={() => {
              onAddToCart(product, quantity);
            }}
          >
            <b>Add to Cart</b>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
