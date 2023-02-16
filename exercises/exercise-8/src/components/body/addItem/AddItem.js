import "./AddItem.scss";

export default function AddItem() {
  return (
    <div className="items__header">
      <p className="items__header-title">Add Items</p>
      <input
        className="items__add-item"
        type="text"
        placeholder="Add item..."
      />
      <input className="items__add-btn" type="button" value="Submit" />
    </div>
  );
}
