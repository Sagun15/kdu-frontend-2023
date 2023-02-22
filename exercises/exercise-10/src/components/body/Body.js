import { useState, useEffect } from "react";
import Filter from "./filter/Filter";
import "./Body.scss";
import Items from "./items/Items";
import items from "../../db/items.json";

export default function Body() {

  const [itemsList, setItemsList] = useState(items);
  const [sortByValue, setSortByValue] = useState("Ascending");
  const [filterByValue, setFilterByValue] = useState("All Jacket");

  useEffect(() => {
    if (sortByValue === "Ascending") {
      items.sort((item1, item2) => item1.price - item2.price);
    } else {
      items.sort((item1, item2) => item2.price - item1.price);
    }
    if (filterByValue === "All Jacket") {
      setItemsList(items);
    } else {
      const updatedItemsList = items.filter(
        (item) => item.itemName === filterByValue
      );
      setItemsList([...updatedItemsList]);
    }
  }, [filterByValue]);

  useEffect(() => {
    if (sortByValue === "Ascending") {
      itemsList.sort((item1, item2) => item1.price - item2.price);
      setItemsList([...itemsList]);
    } else {
      itemsList.sort((item1, item2) => item2.price - item1.price);
      setItemsList([...itemsList]);
    }
  }, [sortByValue]);

  const sortHandler = (sortValue) => {
    setSortByValue(sortValue);
  };

  const filterHandler = (filterValue) => {
    setFilterByValue(filterValue);
  };

  return (
    <div className="container">
      <Filter filterHandler={filterHandler} sortHandler={sortHandler} />
      <Items itemsList={itemsList} />
    </div>
  );
}
