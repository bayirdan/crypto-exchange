import "./PageHome.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Components
import Header from "../../components/Header/Header";
import Item from "../../components/Item/Item";
import Search from "../../components/Search/Search";
import Loading from "../../components/Loading/Loading";
// React icons
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
// Slice
import { getAllCoins, reset } from "../../features/coin/coinSlice";

const PageHome = () => {
  const [page, setPage] = useState(1);

  const { coins, isLoading, isError, message } = useSelector(
    (store) => store.coin
  );
  const dispatch = useDispatch();

  // Get all coins
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getAllCoins(page));
  }, [page]);

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
      {isLoading && <Loading />}
      <Header />
      <div className="home-box">
        <div className="home">
          <h1>Markets</h1>
          <div className="markets">
            <div className="tools">
              <Search />
            </div>
            <ul className="coin-list">
              {coins &&
                coins.map((item, index) => {
                  return <Item key={index} item={item} />;
                })}
            </ul>
            <div className="tools">
              <div className="pages">
                <FaAngleLeft onClick={onDecrement} />
                {page}
                <FaAngleRight onClick={onIncrement} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHome;
