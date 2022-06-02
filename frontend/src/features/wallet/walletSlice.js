import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import walletService from "./walletService";

const initialState = {
  balance: null,
  coins: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Get user's wallet
export const getWallet = createAsyncThunk(
  "wallet/getWallet",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await walletService.getWallet(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// setBalance
export const setBalance = createAsyncThunk(
  "wallet/addBalance",
  async (balanceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await walletService.setBalance(balanceData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get user's coins
      .addCase(getWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.balance = action.payload.balance;
        state.coins = action.payload.coins;
      })
      .addCase(getWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // setBalance
      .addCase(setBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.balance = action.payload;
      })
      .addCase(setBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
