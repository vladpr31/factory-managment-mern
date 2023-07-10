//importing modules.
const connectDB = require("./config/mongoDB.config");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const shiftsRoute = require("./routes/shiftsRoute");
const verifyJWT = require("./helpers/verifyJWT");
//Server Creation & Connection to DB.
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

//Routes go here:
app.use("/auth", authRoute);
app.use("/users", verifyJWT, userRoute);
app.use("/shifts", verifyJWT, shiftsRoute);

module.exports = app;
