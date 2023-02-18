import "./Header.scss";

export default function Header(props) {
  const searchInputHandler = (e) => {
    props.searchInputHandler(e.target.value);
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
