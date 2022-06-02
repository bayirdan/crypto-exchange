import "./PageDeposit.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  setBalance,
  getWallet,
  reset,
} from "../../features/wallet/walletSlice";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";

const PageDeposit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { balance, isError, message } = useSelector((store) => store.wallet);
  const { user } = useSelector((store) => store.auth);
  const [formBalance, setFormBalance] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(getWallet());
    dispatch(reset());
  }, [isError]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formBalance < 10) {
      return toast.error("Minimum $10");
    }

    if (e.target.name === "deposit") {
      const data = {
        balanceData: formBalance,
      };
      dispatch(setBalance(data));
      setFormBalance("");
    }

    if (e.target.name === "withdraw") {
      const data = {
        balanceData: -formBalance,
      };
      dispatch(setBalance(data));
      setFormBalance("");
    }
  };

  return (
    <>
      {!balance && <Loading />}
      <Header />
      <div className="deposit-box">
        <div className="deposit">
          <h2>Crypto Exchange</h2>
          <p> You can deposit or withdraw USD</p>
          <form>
            <input
              type="number"
              name="amount"
              placeholder="amount"
              value={formBalance}
              onChange={(e) => setFormBalance(e.target.value)}
            />
            <div className="buttons">
              <button
                className="btn green"
                name="deposit"
                onClick={onSubmit}
                disabled={!formBalance}
              >
                Deposit
              </button>
              <button
                className="btn red"
                name="withdraw"
                onClick={onSubmit}
                disabled={!formBalance}
              >
                Withdraw
              </button>
            </div>
          </form>
          <div className="balance">
            Your Balance: <span>${balance && balance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageDeposit;
