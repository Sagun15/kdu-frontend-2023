import { useContext } from "react";
import { ItemContext } from "../../Body";
import { ItemProps } from "../../../../interfaces/Interface"
import "./Item.scss";

const Item: React.FC<ItemProps> = ({ item }) => {
  const { items, setItems } = useContext(ItemContext);
  const deleteHandler = (item: string) => {
    const updatedList = items.filter((itemName) => itemName !== item);
    setItems(updatedList);
  };
  return (
    <div className="item">
      <p className="item__title">{item}</p>
      <input
        className="item__close-btn"
        type="button"
        value="X"
        onClick={() => deleteHandler(item)}
      />
    </div>
  );
};

export default Item;
