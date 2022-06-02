import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./PageDetail.scss";
import { toast } from "react-toastify";

// Components
import Header from "../../components/Header/Header";
import Item from "../../components/Item/Item";
import Loading from "../../components/Loading/Loading";
// Reducers
import {
  getCoin,
  reset,
  addCoin,
  sellCoin,
} from "../../features/coin/coinSlice";

const PageDetail = () => {
  const [formData, setFormData] = useState({
    totalPrice: "",
    amount: "",
  });
  const { totalPrice, amount } = formData;
  const { coins, isError, message, isLoading } = useSelector(
    (store) => store.coin
  );
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const coinId = pathname.split("/")[2];

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getCoin(coinId));

    const interval = setInterval(() => {
      dispatch(getCoin(coinId));
    }, 30000);

    dispatch(reset());
    return () => clearInterval(interval);
  }, [dispatch, isError, message, user]);

  const onChange = (e) => {
    if (e.target.name === "amount") {
      setFormData({
        amount: e.target.value,
        totalPrice: Number((e.target.value * coins.priceUsd).toFixed(5)),
      });
    } else {
      setFormData({
        amount: Number((e.target.value / coins.priceUsd).toFixed(5)),
        totalPrice: e.target.value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!amount) {
      return toast.error("Please add fields!");
    }

    if (amount <= 0) {
      return toast.error("Please increase amount!");
    }

    if (totalPrice < 10) {
      return toast.error("Minimum 10 USDT");
    }

    if (!user) {
      return navigate("/login");
    }

    const coinData = {
      symbol: coins.symbol,
      amount: Number(amount),
      totalPrice: Number(totalPrice),
      coinId,
    };

    if (e.target.name === "buy") {
      dispatch(addCoin(coinData));
      dispatch(reset());

      setFormData({
        totalPrice: "",
        amount: "",
      });
    } else {
      dispatch(sellCoin(coinData));
      dispatch(reset());
      // location.reload();
      setFormData({
        totalPrice: "",
        amount: "",
      });
    }
  };

  return (
    <>
      {!coins.name && <Loading />}
      <Header />
      <div className="detail-box">
        <h1>Buy / Sell</h1>
        <div className="detail">
          <h3>{coins.name && coins.name}</h3>
          <Item item={coins} />
          <div className="exchange-box">
            <div className="exchange">
              <h3>Exchange</h3>
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={onChange}
                placeholder="amount..."
              />
              <input
                type="number"
                name="totalPrice"
                value={totalPrice}
                onChange={onChange}
                placeholder="total price $..."
              />
              <div className="buttons">
                <button
                  className="btn green"
                  onClick={onSubmit}
                  type="submit"
                  name="buy"
                  disabled={!amount}
                >
                  Buy
                </button>
                <button
                  className="btn red"
                  onClick={onSubmit}
                  type="submit"
                  name="sell"
                  disabled={!amount}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDetail;
