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

// Get a coin
export const getCoin = createAsyncThunk(
  "coin/getCoin",
  async (coinId, thunkAPI) => {
    try {
      return await coinService.getCoin(coinId);
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

// Get search coin
export const getSearchCoin = createAsyncThunk(
  "coin/getSearch",
  async (searchData, thunkAPI) => {
    try {
      return await coinService.getSearchCoin(searchData);
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

// Add a coin
export const addCoin = createAsyncThunk(
  "coin/addCoin",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await coinService.addCoin(coinData, token);
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

// Sell a coin
export const sellCoin = createAsyncThunk(
  "coin/sellCoin",
  async (coinData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await coinService.sellCoin(coinData, token);
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
      // Get all coins
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
      })
      // Get a coin
      .addCase(getCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coins = action.payload;
      })
      .addCase(getCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get search coin
      .addCase(getSearchCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.coins = action.payload;
      })
      .addCase(getSearchCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add a coin
      .addCase(addCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Sell a coin
      .addCase(sellCoin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellCoin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sellCoin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = coinSlice.actions;
export default coinSlice.reducer;
