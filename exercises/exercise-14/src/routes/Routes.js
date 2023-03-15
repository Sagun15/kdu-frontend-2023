import { Route } from "react-router-dom";
import Body from "../components/body/Body";
import Product from "../components/product/Product";

export default function Routes() {
  return (
    <Routes>
      <Route index element={<Body />} />
      <Route path="product/:id" element={<Product />} />
    </Routes>
  );
}
