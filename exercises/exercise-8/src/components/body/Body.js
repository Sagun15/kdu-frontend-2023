import Items from "./items/Items";
import AddItem from "./addItem/AddItem";
import "./Body.scss";

export default function Body() {
  return (
    <main className="container">
      <AddItem />
      <Items />
    </main>
  );
}
