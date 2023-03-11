import { useContext, useRef } from "react";
import { SearchContext } from "../../App";
import "./Header.scss";

export default function Header() {
  const setSearchValue = useContext(SearchContext);
  const searchValue = useRef();

  const searchProd = () => {
    setSearchValue(searchValue.current.value); 
  }

  return (
    <div className='header'>
        <input className='header__search-bar' type="search" placeholder='Search...' ref={searchValue} onKeyUp={searchProd} />
    </div>
  )
}
