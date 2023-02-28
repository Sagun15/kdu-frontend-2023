import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/searchReducer";
import "./Header.scss";

export default function Header() {
  const searchStore = useDispatch();

  // To set the search value using dispatch
  const searchInputHandler = (e) => {
    searchStore(setSearch(e.target.value));
  };

  return (
    <section className="header-section">
      <div className="header">
        <p className="header__title">Item Lister</p>
        <input
          className="header__search-bar"
          type="search"
          placeholder="Search Items..."
          onChange={searchInputHandler}
        />
      </div>
    </section>
  );
}
