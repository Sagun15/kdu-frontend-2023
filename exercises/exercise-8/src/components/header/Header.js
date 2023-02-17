import "./Header.scss";

export default function Header() {
  return (
    <section className="header-section">
      <div className="header">
        <p className="header__title">Item Lister</p>
        <input
          className="header__search-bar"
          type="search"
          placeholder="Search Items..."
        />
      </div>
    </section>
  );
}
