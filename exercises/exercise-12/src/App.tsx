import React, { useState } from "react";
import Header from "./components/header/Header";
import Body from "./components/body/Body";
import { SearchContext } from "./contexts/Contexts";
import "./App.scss";

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="App">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <Body />
      </SearchContext.Provider>
    </div>
  );
};

export default App;
export { SearchContext };
