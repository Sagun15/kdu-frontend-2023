import "./Item.scss";

export default function Item({ item }) {
  return (
    <div className="item">
      <p className="item__title">{item}</p>
      <input className="item__close-btn" type="button" value="X" />
    </div>
  );
}
