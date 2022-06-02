import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/";

// Get user's wallet
const getWallet = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const walletResponse = await axios.get(API_URL + "coins/wallet", config);
  const coinsResponse = await axios.get(API_URL + "coins");
  let wallet = walletResponse.data;
  let coins = coinsResponse.data.data;

  wallet.coins = wallet.coins.map((coin) => {
    return {
      ...coin,
      price: coins.find((item) => item.name === coin.name).priceUsd,
    };
  });
  return wallet;
};

// Deposit
const setBalance = async (balanceData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "users/set-balance",
    balanceData,
    config
  );

  return response.data;
};

const walletService = {
  getWallet,
  setBalance,
};

export default walletService;
