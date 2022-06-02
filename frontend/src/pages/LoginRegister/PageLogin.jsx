import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";

import { login, reset } from "../../features/auth/authSlice";

import { FaBitcoin } from "react-icons/fa";
import { toast } from "react-toastify";

const PageLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { user, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Login successful");
    }

    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, isError, dispatch, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please add all fields!");
    }

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  return (
    <div className="login-register-box">
      <div className="login-register">
        <Link to="/">
          <div className="title">
            Crypto <FaBitcoin /> Exchange
          </div>
        </Link>
        <div className="form">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="email..."
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="password"
            />
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
