import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.scss";
import { toast } from "react-toastify";

//Components
import Loading from "../../components/Loading/Loading";
// React icons
import { FaBitcoin } from "react-icons/fa";
// Slice
import { register, reset } from "../../features/auth/authSlice";

const PageRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const { isLoading, isSuccess, user, message, isError } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      return toast.error(message);
    }

    if (isSuccess) {
      toast.success("Register successful");
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      return toast.error("Please add all fields!");
    }

    if (password !== password2) {
      return toast.error("Password do not match !");
    }
    const data = {
      name,
      email,
      password,
    };

    dispatch(register(data));
  };

  return (
    <div className="login-register-box">
      {isLoading && <Loading />}
      <div className="login-register">
        <Link to="/">
          <div className="title">
            Crypto <FaBitcoin /> Exchange
          </div>
        </Link>
        <div className="form">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="name..."
            />
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
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="confirm password"
            />
            <input type="number" name="balance" placeholder="$1.000" disabled />
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
