import Item from "./item/Item";
import { SearchContext } from "../../../App";
import { useContext } from "react";
import "./Items.scss";
import { ItemContext } from "../Body";

export default function Items() {
  const { search } = useContext(SearchContext);
  const { items } = useContext(ItemContext);

  const getItems = () => {
    if (search) {
      return items.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
    }
    return items;
  };

  return (
    <div className="items">
      <p className="items__headline">Items</p>
      {items.length === 0 && search === "" ? (
        <p className="info-text">No item exists</p>
      ) : items.length === 0 && search !== "" ? (
        <p className="info-text">No Match Found</p>
      ) : search === "" ? (
        items.map((item) => <Item item={item} />)
      ) : (
        getItems().map((item) => <Item item={item} />)
      )}
    </div>
  );
}
