import { IoIosSearch } from "react-icons/io";
import './styles.css'; 

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="searchbar-container">
      <IoIosSearch className="searchbar-icon"/>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="searchbar-input"
      />
    </div>
  );
};

export default SearchBar;
