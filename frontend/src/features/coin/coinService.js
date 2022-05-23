import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/coins";

// Get all coins
const getAllCoins = async (page) => {
  const response = await axios.get(API_URL);
  return response.data.data.slice((page - 1) * 20, page * 20);
};

const coinService = {
  getAllCoins,
};

export default coinService;
