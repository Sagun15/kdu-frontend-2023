import React from "react";
import "./Filter.scss";

function Filter(props) {
  const filterHandler = (e) => {
    props.filterHandler(e.target.value);
  }

  const sortHandler = (e) => {
    props.sortHandler(e.target.value);
  }

  return (
    <div className="filter__container">
      <div className="filter__by">
        <label for="filter">Filter by:</label>

        <select name="filter" id="filter" onChange={filterHandler}>
          <option value="All Jacket">All Jacket</option>
          <option value="Summer Jacket">Summer Jacket</option>
          <option value="Winter Jacket">Winter Jacket</option>
          <option value="Spring Jacket">Spring Jacket</option>
          <option value="Autumn Jacket">Autumn Jacket</option>
        </select>
      </div>
      <div className="sort__by">
        <label for="sort">Sort by:</label>

        <select name="sort" id="sort" onChange={sortHandler}>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
