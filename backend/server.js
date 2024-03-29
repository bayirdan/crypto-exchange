const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 8000;

// Connect MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/coins", require("./routes/coinRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`***SERVER STARTED ON PORT ${port}***`));
