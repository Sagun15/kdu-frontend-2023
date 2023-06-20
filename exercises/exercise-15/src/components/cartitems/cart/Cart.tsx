import { useAppDispatch } from "../../../app/hooks";
import { cartAction, CartItemState } from "../../../features/cart/CartSlice";
import "./Cart.scss";

function Cart(props: { item: CartItemState }) {
  const dispatch = useAppDispatch();
  const increaseQuantity = () => {
    dispatch(cartAction.updateItem({ id: props.item.id, quantity: 1 }));
  };

  const decreaseQuantity = () => {
    dispatch(cartAction.updateItem({ id: props.item.id, quantity: -1 }));
  };

  return (
    <div className="item">
      <div className="item__details">
        <p className="item__title">{props.item.title}</p>
        <p className="item__price">
          <span className="price-tag">Price</span> $ {props.item.price}
        </p>
      </div>
      <img
        className="item__img"
        src={props.item.image}
        alt={`${props.item.title}-img`}
      />
      <div className="control__btns">
        <button className="increase__qty" onClick={increaseQuantity}>
          +
        </button>
        <p className="item__qty">Quantity: {props.item.quantity}</p>
        <button className="decrease__qty" onClick={decreaseQuantity}>
          -
        </button>
      </div>
    </div>
  );
}

export default Cart;
