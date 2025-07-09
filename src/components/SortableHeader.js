import React from "react";
import "./styles.css"; // Make sure this CSS file is in the same directory

const SortableHeader = ({ columnKey, columnName, sortConfig, onSort }) => {
  const getSortIcon = () => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icon default"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      );
    }

    if (sortConfig.direction === "ascending") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icon ascending"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      );
    }

    if (sortConfig.direction === "descending") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="sort-icon descending"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="sort-icon default"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
        />
      </svg>
    );
  };

  return (
    <th className="sortable-header" onClick={() => onSort(columnKey)}>
      {columnName} {getSortIcon()}
    </th>
  );
};

export default SortableHeader;
