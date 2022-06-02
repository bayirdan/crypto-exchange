const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Coin = require("../models/coinModel");
const User = require("../models/userModel");

const baseURL = "http://api.coincap.io/v2/assets/";

// @desc    Get coins
// @route   GET /api/coins
// @access  Private
const getCoins = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(baseURL + "?limit=2000");
    res.json(response.data);
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Get a coin
// @route   GET /api/coins
// @access  Private
const getCoin = asyncHandler(async (req, res) => {
  const coinId = req.params.id;

  try {
    const response = await axios.get(baseURL + coinId);
    res.json(response.data);
  } catch (error) {
    res.status(400);
    throw new Error("No coin");
  }
});

// @desc    Get user's coins
// @route   GET /api/coins/my-coins
// @access  Private
const getWallet = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const myCoins = await Coin.find({ userId: id });
  const wallet = {
    balance: user.balance,
    coins: myCoins,
  };

  res.json(wallet);
});

// @desc    Get search coin
// @route   GET /api/coins/search
// @access  Public
const getSearch = asyncHandler(async (req, res) => {
  const search = req.body.search;

  try {
    const response = await axios.get(baseURL + `?search=${search}`);
    res.json(response.data);
  } catch (error) {
    res.status(400);
    throw new Error("No coin");
  }
});

// @desc    Add a coin
// @route   POST /api/coins/:id
// @access  Private
const addCoin = asyncHandler(async (req, res) => {
  const { coinId, amount } = req.body;
  const { id } = req.user;

  if (!coinId || !amount) {
    res.status(400);
    throw new Error("Please add some coin");
  }
  const coinData = await axios.get(baseURL + coinId);

  if (!coinData) {
    res.status(400);
    throw new Error("No coin");
  }

  const coin = coinData.data.data;
  const totalPrice = coin.priceUsd * amount;

  // Check the minimum amount
  if (totalPrice < 10) {
    res.status(400);
    throw new Error("The minimum amount is $10");
  }

  const user = await User.findById(id);
  // Check user's balance for total price
  if (user.balance < totalPrice) {
    res.status(400);
    throw new Error("Insufficient balance!");
  }

  // Change user balance
  user.balance = user.balance - totalPrice;
  await user.save();

  // Check the coin if already bought it
  const oldCoin = await Coin.findOne({ symbol: coin.symbol, userId: id });

  if (!oldCoin) {
    // Add coin
    const response = await Coin.create({
      userId: id,
      name: coin.name,
      symbol: coin.symbol,
      amount: amount,
    });
    return res.status(200).json(response);
  }

  // Update coin
  oldCoin.amount = oldCoin.amount + amount;
  await oldCoin.save();
  return res.status(200).json(oldCoin);
});

// @desc    Sell a coin
// @route   PUT /api/coins/:id
// @access  Private
const sellCoin = asyncHandler(async (req, res) => {
  const { coinId, amount } = req.body;
  const { id } = req.user;

  if (!coinId || !amount) {
    res.status(400);
    throw new Error("Please add some coin");
  }
  const coinData = await axios.get(baseURL + coinId);

  if (!coinData) {
    res.status(400);
    throw new Error("No coin");
  }

  const coin = coinData.data.data;
  const totalPrice = coin.priceUsd * amount;

  // Check the minimum amount
  if (totalPrice < 5) {
    res.status(400);
    throw new Error("The minimum amount is $5");
  }

  const userCoin = await Coin.findOne({ userId: id, symbol: coin.symbol });
  // Check user's amount for selling
  if (userCoin.amount < amount) {
    res.status(400);
    throw new Error("Insufficient amount !");
  }

  const user = await User.findById(id);
  // Change user balance
  user.balance = user.balance + totalPrice;
  await user.save();

  // Update coin
  const oldCoin = await Coin.findOne({ symbol: coin.symbol, userId: id });

  oldCoin.amount = oldCoin.amount - amount;
  await oldCoin.save();
  return res.status(200).json(oldCoin);
});

module.exports = {
  getCoins,
  getCoin,
  addCoin,
  sellCoin,
  getSearch,
  getWallet,
};
