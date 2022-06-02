import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "../features/coin/coinSlice";
import authReducer from "../features/auth/authSlice";
import walletReducer from "../features/wallet/walletSlice";

export const store = configureStore({
  reducer: {
    coin: coinReducer,
    auth: authReducer,
    wallet: walletReducer,
  },
});
