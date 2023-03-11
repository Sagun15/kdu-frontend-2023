import { useContext, useState } from "react";
import { ItemContext } from "../Body";
import "./AddItem.scss";

export default function AddItem() {
  const {setItems} = useContext(ItemContext);
  const [addItem, setAddItem] = useState<string>("");

  const addItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddItem(e.target.value);
  };

  const updateItemList = () => {
    setItems((prevState) => [...prevState, addItem]);
    setAddItem("");
  };

  return (
    <div className="items__header">
      <p className="items__header-title">Add Items</p>
      <input
        className="items__add-item"
        type="text"
        value={addItem}
        placeholder="Add item..."
        onChange={addItemHandler}
      />
      <input
        className="items__add-btn"
        type="button"
        value="Submit"
        onClick={updateItemList}
      />
    </div>
  );
}
