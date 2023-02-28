import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../redux/itemReducer";
import "./AddItem.scss";

export default function AddItem() {
  const [item, setItem] = useState("");

  const reduxDispatch = useDispatch();

  // To keep record of latest state of input element
  const addItemHandler = (e) => {
    setItem(e.target.value);
  };

  // To add item using dispatch (isClicked is used to keep track of complted tasks)
  const updateItemList = () => {
    if (item !== "") {
      reduxDispatch(addItem({ name: item, isClicked: false }));
      setItem("");
    } else {
      alert("Please enter a item name");
    }
  };

  return (
    <div className="items__header">
      <p className="items__header-title">Add Items</p>
      <input
        className="items__add-item"
        type="text"
        value={item}
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
