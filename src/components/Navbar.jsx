import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=5dc1ad459cf1db2a5a4406ee2dabbbe0&language=en-US`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };
    fetchGenres();
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onEsc);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [isOpen]);

  return (
    <div className="navbar">
      <ul>
        <li className="nav-item"><NavLink to='/' style={{textDecoration: 'none', color: 'inherit'}}>HOME</NavLink></li>

        <li
          ref={dropdownRef}
          className={`dropdown nav-item ${isOpen ? "open" : ""}`}
        >
          <span
            className="dropdown-btn"
            onClick={() => setIsOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            MOOD 
          <span className="arrow">▾</span>
          </span>

          {isOpen && (
            <ul className="dropdown-menu" role="menu">
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <li key={genre.id} role="menuitem">
                    <NavLink to={`/results/${genre.id}/1`} style={{textDecoration: 'none', color: 'inherit'}}>{genre.name}</NavLink>
                  </li>
                ))
              ) : (
                <li>Loading...</li>
              )}
            </ul>
          )}
        </li>
      </ul>

      <div className="search-box">
        <input type="text" placeholder="SEARCH..." />
      </div>
    </div>
  );
}
