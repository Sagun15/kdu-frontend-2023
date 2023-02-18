import Item from "./item/Item";
import "./Items.scss";

export default function Items(props) {
  const updateItemsList = (name) => {
    props.updateItemsList(name);
  };
  return (
    <div className="items">
      <p className="items__headline">Items</p>
      {props.itemsList.length === 0 && !props.isFiltered ? (
        <p className="info-text">No item exists</p>
      ) : props.itemsList.length === 0 && props.isFiltered ? (
        <p className="info-text">No Match Found</p>
      ) : (
        props.itemsList.map((item) => (
          <Item key={item} item={item} deleteItemHandler={updateItemsList} />
        ))
      )}
    </div>
  );
}
