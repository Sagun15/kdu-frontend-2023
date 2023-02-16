import "./Header.scss";

export default function Header() {
  return (
    <section className="header-section">
      <div className="header">
        <h1 className="header__title">Item Lister</h1>
        <input
          className="header__search-bar"
          type="search"
          placeholder="Search Items..."
        />
      </div>
    </section>
  );
}
