import { Link } from "react-router-dom";
import "./LoginRegister.scss";

import { FaBitcoin } from "react-icons/fa";

const PageLogin = () => {
  return (
    <div className="login-register-box">
      <div className="login-register">
        <Link to="/">
          <div className="title">
            Crypto <FaBitcoin /> Exchange
          </div>
        </Link>
        <div className="form">
          <form>
            <input type="email" name="email" placeholder="email..." />
            <input type="password" name="password" placeholder="password" />
            <button type="submit" className="btn btn-confirm">
              Login
            </button>
          </form>
          <div className="link">
            <Link to="/register">Don't have any account? Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
