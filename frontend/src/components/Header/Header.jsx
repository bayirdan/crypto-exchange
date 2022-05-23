import "./Header.scss";
import { Link } from "react-router-dom";

import { FaWallet, FaBitcoin } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-box">
      <div className="header">
        <header>
          <div className="header__left">
            <Link to="/">
              <div className="logo">
                Crypto <FaBitcoin /> Exchange
              </div>
            </Link>
          </div>
          <div className="header__right">
            <div className="login-register">
              <Link to="/login">
                <button className="btn btn-login">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-register">Register</button>
              </Link>
            </div>
            <div className="logout">
              <div className="my-wallet">
                <Link to="/my-wallet">
                  <span>My Wallet</span>
                  <FaWallet />
                </Link>
              </div>
              <button className="btn btn-logout">Logout</button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
