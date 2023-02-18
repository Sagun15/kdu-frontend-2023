import { useState } from "react";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import "./App.scss";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const searchInputHandler = (searchValue) => {
    setSearchValue(searchValue);
  };
  return (
    <div className="App">
      <Header searchInputHandler={searchInputHandler} />
      <Body searchValue={searchValue} />
    </div>
  );
}

export default App;
