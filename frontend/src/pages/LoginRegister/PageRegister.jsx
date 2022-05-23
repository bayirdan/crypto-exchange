import { Link } from "react-router-dom";
import "./LoginRegister.scss";

import { FaBitcoin } from "react-icons/fa";

const PageRegister = () => {
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
            <input type="text" name="name" placeholder="name..." />
            <input type="email" name="email" placeholder="email..." />
            <input type="password" name="password" placeholder="password" />
            <input
              type="password"
              name="password2"
              placeholder="confirm password"
            />
            <input
              type="number"
              name="balance"
              placeholder="$10.000"
              disabled
            />
            <button type="submit" className="btn btn-confirm">
              Register
            </button>
          </form>
          <div className="link">
            <Link to="/login">Already have any account? Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
