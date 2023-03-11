import { useContext } from "react";
import { DataContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import "./Product.scss";

export default function Product() {
  const productsList = useContext(DataContext);
  console.log(productsList);
  const { id } = useParams();

  const product = productsList.filter((productItem) => {
    console.log(productItem.id, id);
    return Number(productItem.id) == id})[0];

  return (
    <div className="product">
      <p className="product__title">{product.title}</p>
      <img
        className="product__image"
        src={product.image}
        alt={`${product.category}-img`}
      />
      <div className="product__details">
        <p className="product__category">Category: {product.category}</p>
        <p className="product__rating">Rating: {product.rating.rate}</p>
        <p className="product__price">Price: $ {product.price}</p>
        <p className="product__description-title">Product Description:</p>
        <p className="product__description">{product.description}</p>
        <Link className="redirect__link" to="/">
          Back To Products
        </Link>
      </div>
    </div>
  );
}
