import { useState } from "react";
import { useDispatch } from "react-redux";
import { isComplted, removeItem, updateItem } from "../../../../redux/itemReducer";
import "./Item.scss";

export default function Item(props) {
  const [selected, setSelected] = useState(false);
  const reduxDispatch = useDispatch();

  // To remove item from items list
  const deleteItemHandler = () => {
    reduxDispatch(removeItem(props.item));
  };

  // To update state of item (complted or not) using checkbox
  const toggleSelect = () => {
    reduxDispatch(isComplted(props.item.name))
    setSelected(!selected);
  };

  // To update item name using prompt and pass old itemName and new itemName for replacement
  const updateItemHandler = () => {
    const newName = prompt("Update item:", props.item.name) || props.item.name;
    reduxDispatch(updateItem({oldName: props.item.name ,newName}));
  };

  return (
    <div className="item">
      <input type="checkbox" className="item__check" onClick={toggleSelect} defaultChecked={props.item.isClicked} />
      <p className="item__title" style={{textDecoration: props.item.isClicked ? "line-through": "none"}}>{props.item.name}</p>
      <input
        className="item__update-btn alter-btns"
        type="button"
        value="E"
        onClick={updateItemHandler}
      />
      <input
        className="item__close-btn alter-btns"
        type="button"
        value="X"
        onClick={deleteItemHandler}
      />
    </div>
  );
}
