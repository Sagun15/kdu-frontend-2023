import "./App.scss";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import { Routes, Route } from "react-router-dom";
import CartItems from "./components/cartitems/CartItems";
import Footer from "./components/footer/Footer";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";

function App() {
  const cartReducer = useAppSelector((state: RootState) => state.cart);
  const productReducer = useAppSelector((state: RootState) => state.products);
  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <>
              <Header />
              <Body />
            </>
          }
        />
        <Route path="/cart" element={<CartItems />} />
      </Routes>
      {!cartReducer.loading && !productReducer.loading && <Footer />}
    </div>
  );
}

export default App;
