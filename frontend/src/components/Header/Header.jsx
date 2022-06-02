import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// React icons
import { FaWallet, FaBitcoin } from "react-icons/fa";
// Slice
import { logout, reset } from "../../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
            {user ? (
              <div className="logout">
                <div className="my-wallet">
                  <Link to="/wallet">
                    <span>My Wallet</span>
                    <FaWallet />
                  </Link>
                </div>
                <button className="btn btn-logout" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="login-register">
                <Link to="/login">
                  <button className="btn btn-login">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-register">Register</button>
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
