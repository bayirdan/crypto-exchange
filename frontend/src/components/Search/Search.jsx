import "./Search.scss";

import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="search">
      <div className="input">
        <input type="text" name="search" placeholder="bitcoin..." />
        <FaSearch />
      </div>
    </div>
  );
};

export default Search;
