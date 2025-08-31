import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";
import searchIcon from "../assets/search.svg";
import filterIcon from "../assets/filter.svg";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // 🔹 Navigate to the new "search" route
      navigate(`/results/search/${encodeURIComponent(query)}/1`);
      onClose?.();
    }
  };

  return (
    <div className="searchbar-overlay">
      <form className="searchbar-box" onSubmit={handleSubmit}>
        <span className="searchbar-icon">
          <img src={searchIcon} alt="Search" width="20" height="20" />
        </span>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Search movies"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit" className="searchbar-filter">
          <img src={filterIcon} width="20" height="20" alt="Filter" />
        </button>
      </form>
      <div className="searchbar-close" onClick={onClose}>
        ✕
      </div>
    </div>
  );
}