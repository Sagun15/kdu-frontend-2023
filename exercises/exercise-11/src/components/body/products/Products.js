import React from "react";
import { Link } from "react-router-dom";
import "./Products.scss";

export default function Products({product}) {
  return (
    <div className="item">
      <img className="item__img" src={product.image} alt={`${product.category}-img`} />
      <div className="item__details">
        <Link to={`product/${product.id}`} className="item__title">{product.title}</Link>
        <p className="item__price">$ {product.price}</p>
      </div>
    </div>
  );
}
