import { useState } from "react";
import Items from "./items/Items";
import AddItem from "./addItem/AddItem";
import "./Body.scss";

export default function Body(props) {
  const [items, setItems] = useState([]);

  const addItemHandler = (item) => {
    setItems([...items, item]);
  };

  const deleteItemHandler = (name) => {
    const updatedList = items.filter((item) => item !== name);
    setItems(updatedList);
  };

  return (
    <main className="container">
      <AddItem updateItemsList={addItemHandler} />
      {props.searchValue === "" ? (
        <Items
          itemsList={items}
          updateItemsList={deleteItemHandler}
          isFiltered={false}
        />
      ) : (
        <Items
          itemsList={items.filter((item) => item.startsWith(props.searchValue))}
          updateItemsList={deleteItemHandler}
          isFiltered={true}
        />
      )}
    </main>
  );
}
