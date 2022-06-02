import "./PageHome.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// Components
import Header from "../../components/Header/Header";
import Item from "../../components/Item/Item";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";
// React icons
import { FaAngleRight, FaAngleLeft, FaSearch } from "react-icons/fa";
// Slice
import { getAllCoins, reset } from "../../features/coin/coinSlice";

const PageHome = () => {
  const [page, setPage] = useState(1);

  const { coins, isLoading, isError, message } = useSelector(
    (store) => store.coin
  );
  const dispatch = useDispatch();

  // Set interval
  useEffect(() => {
    dispatch(getAllCoins(page));
    const interval = setInterval(() => {
      dispatch(getAllCoins(page));
    }, 30000);

    dispatch(reset());
    return () => clearInterval(interval);
  }, [page, dispatch]);

  // Page increment
  const onIncrement = () => {
    if (page >= 40) {
      return;
    }
    setPage((page) => page + 1);
  };
  // Page decrement
  const onDecrement = () => {
    if (page <= 1) {
      return;
    }
    setPage((page) => page - 1);
  };

  return (
    <>
      {coins.length < 1 && <Loading />}
      <Header />
      <div className="home-box">
        <div className="home">
          <h1>Markets</h1>
          <Link to="/search">
            <FaSearch className="search-btn" />
          </Link>
          <div className="markets">
            <div className="tools">
              <div className="pages">
                <FaAngleLeft onClick={onDecrement} />
                {page}
                <FaAngleRight onClick={onIncrement} />
              </div>
            </div>
            <div className="list-info">
              <span>Name</span>
              <span>Price / 24h</span>
            </div>
            <ul className="coin-list">
              {coins &&
                coins.length > 0 &&
                coins.map((item, index) => {
                  return <Item key={index} item={item} />;
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHome;
