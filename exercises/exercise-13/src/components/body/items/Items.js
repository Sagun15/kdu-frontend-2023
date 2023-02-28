import Item from "./item/Item";
import { useDispatch, useSelector } from "react-redux";
import { removeCompletedItems } from "../../../redux/itemReducer";
import "./Items.scss";

export default function Items() {
  const itemStore = useSelector((state) => state.item);
  const searchStore = useSelector((state) => state.search);
  const reduxDispatch = useDispatch();

  // To filter items by search
  const itemsList = itemStore.items.filter((item) =>
    item.name.startsWith(searchStore.searchValue)
  );

  // To remove completed tasks using dispatch
  const removeCompletedItem = () => {
    reduxDispatch(removeCompletedItems())
  };

  return (
    <div className="items">
      <div className="items__head">
        <p className="items__headline">Items</p>
        <input
          type="button"
          className="items__remove-completed"
          value="Remove Completed"
          style={{display : itemsList.length === 0 ? 'none' : 'block'}}
          onClick={removeCompletedItem}
        />
      </div>
      {itemsList.length === 0 && searchStore.searchValue.length === 0 ? (
        <p className="info-text">No item exists</p>
      ) : itemsList.length === 0 &&
        searchStore.searchValue.length !== 0 ? (
        <p className="info-text">No Match Found</p>
      ) : (
        itemsList.map((item) => <Item key={item.name} item={item} />)
      )}
    </div>
  );
}
