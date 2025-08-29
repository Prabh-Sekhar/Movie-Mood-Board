import React, { useState } from 'react';
import './Dropdown.css';
import filter from '../assets/filter.svg';

export default function Dropdown({
  sortOptions,
  onClose, onApply,
  initialSelectedSort = '',
  onCancel
}) {
  const [localSort, setLocalSort] = useState(initialSelectedSort);

  const handleSortSelect = (sortValue) => setLocalSort(sortValue);

  const handleApply = () => {
    onApply(localSort);
  };

  return (
    <div className="filter-window">
      <button className="filter-window-close" onClick={onClose} aria-label="Close">&#10005;</button>
      <div className="filter-window-section">
        <div className="filter-window-label">Sort:</div>
        <div className="filter-window-sort-grid">
          {sortOptions.map(option => (
            <div
              key={option.value}
              className={`filter-window-item${localSort === option.value ? ' selected' : ''}`}
              onClick={() => handleSortSelect(option.value)}
            >
              {option.label}
              {localSort === option.value && <span className="filter-window-check">&#10003;</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-window-actions">
        <button className="filter-window-cancel" onClick={onCancel}>Cancel</button>
        <button className="filter-window-apply" onClick={handleApply}>
          Sort <img width="18" height="18" fill="#5442F4" src={filter} alt="filter" />
        </button>
      </div>
    </div>
  );
}