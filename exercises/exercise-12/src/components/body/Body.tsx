import { useState } from "react";
import Items from "./items/Items";
import AddItem from "./addItem/AddItem";
import { ItemContext } from "../../contexts/Contexts";
import "./Body.scss";

const Body: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  return (
    <main className="container">
      <ItemContext.Provider value={{ items, setItems }}>
        <AddItem />
        <Items />
      </ItemContext.Provider>
    </main>
  );
};

export default Body;
export { ItemContext };
