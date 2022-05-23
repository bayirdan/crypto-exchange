import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import coinService from "./coinService.js";

const initialState = {
  coins: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all coins
export const getAllCoins = createAsyncThunk(
  "coin/getAll",
  async (page, thunkAPI) => {
    try {
      return await coinService.getAllCoins(page);
    } catch (error) {
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const coinSlice = createSlice({
  name: "coin",
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
      .addCase(getAllCoins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coins = action.payload;
      })
      .addCase(getAllCoins.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = coinSlice.actions;
export default coinSlice.reducer;
