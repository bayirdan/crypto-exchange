import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/coins/";

// Get all coins
const getAllCoins = async (page) => {
  const response = await axios.get(API_URL);
  return response.data.data.slice((page - 1) * 20, page * 20);
};

// Get a coin
const getCoin = async (coinId) => {
  const response = await axios.get(API_URL + `coin/${coinId}`);
  return response.data.data;
};

// Get search coin
const getSearchCoin = async (searchData) => {
  const response = await axios.post(API_URL + "search", searchData);
  return response.data.data;
};

// Add a coin
const addCoin = async (coinData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + `coin/${coinData.coinId}`,
    coinData,
    config
  );
  return response.data.data;
};

// Sell a coin
const sellCoin = async (coinData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + `coin/${coinData.coinId}`,
    coinData,
    config
  );
  return response.data.data;
};

const coinService = {
  getAllCoins,
  getSearchCoin,
  getCoin,
  addCoin,
  sellCoin,
};

export default coinService;
