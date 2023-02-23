import { useContext } from "react";
import {DataContext} from "../../App";
import Products from "./products/Products";
import "./Body.scss";

export default function Body() {
  const productsList  = useContext(DataContext);
  return (
    <div className="container">
      <p className="headline">kdu <span className="headline__design">marketplace</span></p>
      <div className="products">
        {productsList.length === 0 && <p className="products__not-found">No such product exists</p>}
      {productsList.length > 0 && productsList.map((product) => (
        <Products key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
}
