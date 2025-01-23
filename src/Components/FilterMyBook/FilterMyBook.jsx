import { useState } from "react";
import style from "./FilterMyBook.module.css";

export default function FilterMyBook({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All books");

  const filters = ["All books", "Unread", "In progress", "Done"];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <div className={style.dropdown}>
      <button
        className={style.dropdownButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedFilter}</span>
        <span className={`${style.arrow} ${isOpen ? style.open : ""}`}></span>
      </button>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          {filters.map((filter) => (
            <li
              key={filter}
              className={style.dropdownItem}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
