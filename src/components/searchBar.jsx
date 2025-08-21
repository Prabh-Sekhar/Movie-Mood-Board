import React from 'react';
import './searchBar.css';
import searchIcon from '../assets/search.svg';
import filterIcon from '../assets/filter.svg';

export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <div className="searchbar-box">
        <span className="searchbar-icon">
          <img src={searchIcon} alt="Search" width="20" height="20"/>
        </span>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search movies"
        />
        <button className="searchbar-filter">
          <img src={filterIcon} width="20" height="20"/>
          {/* <span className="filter-textu">Filter
          </span> */}
        </button>
      </div>
    </div>
  );
}