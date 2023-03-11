import Item from "./item/Item";
import "./Items.scss";

const itemsList = ["Item 1", "Item 2", "Item 3", "Item 4"];

export default function Items() {
  return (
    <div className="items">
      <p className="items__headline">Items</p>
      {itemsList.map((item) => <Item key={item} item={item} />)}
    </div>
  );
}
