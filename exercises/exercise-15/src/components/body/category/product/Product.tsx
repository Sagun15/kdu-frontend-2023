import "./Product.scss";
import { ProductItemState } from "../../../../features/products/ProductsSlice";
import { useAppDispatch } from "../../../../app/hooks";
import { cartAction } from "../../../../features/cart/CartSlice";

function Product(props: { product: ProductItemState }) {
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(
      cartAction.addItem({
        id: props.product.id,
        title: props.product.title,
        image: props.product.image,
        quantity: 1,
        price: props.product.price,
      })
    );
  };

  return (
    <div className="product">
      <div className="product__details">
        <p className="product__title">{props.product.title}</p>
        <p className="product__price">
          <span className="price-tag">Start Price</span> $ {props.product.price}
        </p>
      </div>
      <img
        className="product__img"
        src={props.product.image}
        alt={`${props.product.title}-img`}
      />
      <button className="product__cart-btn" onClick={addToCart}>
        Add to cart
      </button>
    </div>
  );
}

export default Product;
