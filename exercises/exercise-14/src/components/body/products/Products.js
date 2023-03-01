import React from "react";
import "./Products.scss";

export default function Products({product}) {
  return (
    <div className="item">
      <img className="item__img" src={product.image} alt={`${product.category}-img`} />
      <div className="item__details">
        <p className="item__title">{product.title}</p>
        <p className="item__price">$ {product.price}</p>
      </div>
    </div>
  );
}
