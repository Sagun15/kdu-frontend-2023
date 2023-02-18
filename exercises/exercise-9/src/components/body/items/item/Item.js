import "./Item.scss";

export default function Item(props) {
  const deleteHandler = () => {
    props.deleteItemHandler(props.item);
  };
  return (
    <div className="item">
      <p className="item__title">{props.item}</p>
      <input
        className="item__close-btn"
        type="button"
        value="X"
        onClick={deleteHandler}
      />
    </div>
  );
}
