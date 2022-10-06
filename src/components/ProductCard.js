import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart, params }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="p" component="p" style={{ fontWeight: '500' }}>
          {product.name}
        </Typography>
        <Typography gutterBottom variant="p" component="p" style={{ fontWeight: 'bold' }}>
          ${product.cost}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <Rating name="read-only" value={product.rating} readOnly />
        </Typography>
        <Button className="card-button" variant="contained" startIcon={<AddShoppingCartOutlined />} onClick={()=>handleAddToCart(localStorage.getItem('token'), params['cartItems'], params['allProduct'], product._id, 1, {preventDuplicate: true})}>add to cart</Button>
      </CardContent>
    </Card >
  );
};

export default ProductCard;



