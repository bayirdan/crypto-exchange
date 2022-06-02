import "./PageWallet.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getWallet, reset } from "../../features/wallet/walletSlice";
import Header from "../../components/Header/Header";

const PageWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coins, balance, isLoading } = useSelector((store) => store.wallet);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getWallet());
    const interval = setInterval(() => {
      dispatch(getWallet());
    }, 30000);

    dispatch(reset());
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="wallet-box">
        <h1>My Wallet</h1>
        <div className="wallet">
          <h2>Bayirdan</h2>
          <div className="total-balance">
            Total Balance:
            <span>
              $
              {coins.length
                ? (
                    coins.reduce(
                      (sum, coin) => sum + Number(coin.price * coin.amount),
                      0
                    ) + balance
                  ).toFixed(2)
                : balance && balance.toFixed(2)}
            </span>
          </div>
          <div className="all-coins">
            <div className="coins-title">
              <div className="title-symbol">Coin</div>
              <div className="title-amount">Amount</div>
              <div className="title-total">Total</div>
            </div>
            <ul>
              <li>
                <Link to="/deposit">
                  <div className="coin-item">
                    <div className="coin-symbol">USD</div>
                    <div className="coin-amount">
                      {balance && balance.toFixed(2)}
                    </div>
                    <div className="coin-total">
                      ${balance && balance.toFixed(2)}
                    </div>
                  </div>
                </Link>
              </li>
              {coins.length
                ? coins.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link to={"/coins/" + item.name.toLowerCase()}>
                          <div className="coin-item">
                            <div className="coin-symbol">{item.symbol}</div>
                            <div className="coin-amount">
                              {item.amount.toFixed(2)}
                            </div>
                            <div className="coin-total">
                              ${(item.amount * item.price).toFixed(2)}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
            <div className="add-balance">
              <button className="btn" onClick={() => navigate("/deposit")}>
                Deposit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWallet;
