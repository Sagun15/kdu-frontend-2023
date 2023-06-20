import Cart from "./cart/Cart";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import "./CartItems.scss";
import Snackbar from "./snackbar/Snackbar";
import { placeItemsOrder } from "../../features/cart/CartSlice";
import shoppinglogo from "../../images/shopping-cart.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function CartItems() {
  const cartProvider = useAppSelector((state: RootState) => state.cart);
  const [checkout, setCheckout] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const payAmount = () => {
    dispatch(placeItemsOrder()).then(() => setCheckout(true));
  };

  return (
    <div className="cart__items">
      {cartProvider.loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {cartProvider.items.length === 0 ? (
            <div className="empty__cart">
              <img
                src={shoppinglogo}
                className="empty__cart-icon"
                alt={shoppinglogo}
              />
              <p className="empty__cart-title">No Items Exists Inside Cart!!</p>
              <NavLink className="home__link" to="/">
                Explore
              </NavLink>
            </div>
          ) : (
            cartProvider.items.map((item) => <Cart item={item} />)
          )}
          {cartProvider.items.length > 0 && (
            <p className="cart__items-amt">
              Net Amount : $ {Math.round(cartProvider.totalPrice)}
            </p>
          )}
          {cartProvider.items.length > 0 && (
            <button className="cart__items-btn" onClick={payAmount}>
              Pay ${Math.round(cartProvider.totalPrice)}
            </button>
          )}
          {checkout && <Snackbar />}
        </>
      )}
    </div>
  );
}

export default CartItems;
