import Products from "./products/Products";
import "./Body.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/marketSlice";
import Snackbar from "./snackbar/Snackbar";

export default function Body() {
  const productsStore = useSelector(state => state.products);

  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(fetchProducts());
  }, [reduxDispatch]);

  return (
    <div className="container">
      <p className="headline">
        kdu <span className="headline__design">marketplace</span>
      </p>
      {productsStore.loadingProducts ? (<div className="loader"></div>) : (<div className="products">
        {productsStore.productsList.length === 0 && (
          <p className="products__not-found">Failed to fetch products</p>
        )}
        {productsStore.productsList.length > 0 &&
          productsStore.productsList.map((product) => (
            <Products key={product.id} product={product} />
          ))}
          {productsStore.responseStatus !== "" && <Snackbar />}
      </div>)}
    </div>
  );
}
