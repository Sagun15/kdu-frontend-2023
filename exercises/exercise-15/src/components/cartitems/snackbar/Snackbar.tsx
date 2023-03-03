import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import "./Snackbar.scss";

function Snackbar() {
  const cartStore = useAppSelector((state: RootState) => state.cart);

  return (
    <div
      className={`snackbar ${
        cartStore.status === false ? "snackbar__error" : "snackbar__success"
      }`}
    >
      {cartStore.responseStatus}
    </div>
  );
}

export default Snackbar;
