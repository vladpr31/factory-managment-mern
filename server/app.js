//importing modules.
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/mongoDB.config");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const verifyJWT = require("./helpers/verifyJWT");
//Server Creation & Connection to DB.
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

//Routes go here:
app.use("/auth", authRoute);
app.use("/users", verifyJWT, userRoute);

module.exports = app;
