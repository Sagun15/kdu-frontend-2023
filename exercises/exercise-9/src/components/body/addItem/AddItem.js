import { useState } from "react";
import "./AddItem.scss";

export default function AddItem(props) {
  const [addItem, setAddItem] = useState("");

  const addItemHandler = (e) => {
    setAddItem(e.target.value);
  };

  const updateItemList = () => {
    props.updateItemsList(addItem);
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
