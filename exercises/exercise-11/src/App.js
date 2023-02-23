import { createContext, useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import Body from "./components/body/Body";
import Header from "./components/header/Header";
import { Routes, Route } from "react-router-dom";
import Product from "./components/product/Product";

const DataContext = createContext();
const SearchContext = createContext();

function App() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterData , setFilterData] = useState([]);

  const getData = async () => {
    await axios.get("https://fakestoreapi.com/products").then((value) => {
      setProductsList(value.data); 
      setFilterData(value.data)
      setLoading(true);
    });
  };

  useEffect(() => {
    setFilterData((prevState) => {
      return productsList.filter((product) => {
        return product.title.startsWith(searchValue);
      })
    })
  },[searchValue]);

  console.log(filterData); 
 

  useEffect(() => {
    getData().catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <SearchContext.Provider value={setSearchValue}>
        <Header />
      </SearchContext.Provider>
      <DataContext.Provider value={filterData}>
        <Routes>
          <Route index element={loading && <Body />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </DataContext.Provider>
    </div>
  );
}

export default App;
export { DataContext, SearchContext };
