import "./Search.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// React icons
import { FaSearch } from "react-icons/fa";
// Slice
import { getSearchCoin } from "../../features/coin/coinSlice";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch();

  const onSearch = (e) => {
    e.preventDefault();

    if (searchData.length < 1) {
      return toast.error("Please add the field!");
    }

    const data = {
      search: searchData,
    };
    dispatch(getSearchCoin(data));
  };

  return (
    <div className="search">
      <div className="input">
        <form onSubmit={onSearch}>
          <input
            type="text"
            name="search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="bitcoin... btc..."
          />
          <FaSearch type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Search;
