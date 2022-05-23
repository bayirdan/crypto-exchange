import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageHome from "./pages/Home/PageHome";
import PageLogin from "./pages/LoginRegister/PageLogin";
import PageRegister from "./pages/LoginRegister/PageRegister";

const App = () => {
  return (
    <>
      <HashRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/register" element={<PageRegister />} />
            <Route path="/login" element={<PageLogin />} />
          </Routes>
        </div>
      </HashRouter>
      <ToastContainer />
    </>
  );
};

export default App;
