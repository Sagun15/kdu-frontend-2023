import { useContext } from "react";
import { SearchContext } from "../../App";
import "./Header.scss";

const Header: React.FC = () => {
  const {setSearch} = useContext(SearchContext);

  return (
    <section className="header-section">
      <div className="header">
        <p className="header__title">Item Lister</p>
        <input
          className="header__search-bar"
          type="search"
          placeholder="Search Items..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </section>
  );
}

export default Header;