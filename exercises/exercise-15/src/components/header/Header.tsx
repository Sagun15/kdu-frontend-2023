import "./Header.scss";
import logo from "../../images/kickdrum-text-logo.png";
import searchIcon from "../../images/search.png";
import cartIcon from "../../images/cart.png";
import { searchAction } from "../../features/search/SearchSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
import {
  categoryAction,
  fetchCategories,
} from "../../features/category/CategorySlice";

function Header() {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const productCategories = useAppSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const searchProducts = () => {
    dispatch(searchAction.setQuery(search));
  };

  const selectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== "all") {
      dispatch(categoryAction.setCategory([e.target.value]));
    } else {
      dispatch(categoryAction.setCategoryToDefault());
    }
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <select className="header__filter-options" onChange={selectCategory}>
        <option value="all">All Categories</option>
        {productCategories.activeCategory.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="header__search-bar">
        <input
          className="search-field"
          type="search"
          placeholder="Search for item..."
          onChange={searchHandler}
        />
        <button className="search-btn" onClick={searchProducts}>
          <img src={searchIcon} alt="search icon" />
        </button>
      </div>
      <NavLink to="/cart" className="cart-btn">
        <img src={cartIcon} alt="cart-icon" />
        Cart
      </NavLink>
      <p className="header__title">
        <span className="content1">Start shopping</span>your favourite brands
      </p>
    </header>
  );
}

export default Header;
