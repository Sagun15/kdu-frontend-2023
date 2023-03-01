import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/marketSlice";
import "./Snackbar.scss";

function Snackbar() {
  const productsStore = useSelector((state) => state.products);
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(setSnackbar());
  }, 5000);

  return <div className={`snackbar ${productsStore.status === false ? 'snackbar__error' : 'snackbar__success'}`}>{productsStore.responseStatus}</div>;
}

export default Snackbar;
