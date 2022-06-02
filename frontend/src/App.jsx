import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageHome from "./pages/Home/PageHome";
import PageLogin from "./pages/LoginRegister/PageLogin";
import PageRegister from "./pages/LoginRegister/PageRegister";
import PageSearch from "./pages/Search/PageSearch";
import PageDetail from "./pages/Detail/PageDetail";
import PageWallet from "./pages/Wallet/PageWallet";
import PageDeposit from "./pages/Deposit/PageDeposit";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/coins/:id" exact element={<PageDetail />} />
            <Route path="/register" exact element={<PageRegister />} />
            <Route path="/login" exact element={<PageLogin />} />
            <Route path="/search" exact element={<PageSearch />} />
            <Route path="/wallet" exact element={<PageWallet />} />
            <Route path="/deposit" exact element={<PageDeposit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
