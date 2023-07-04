const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: String,
  fullName: String,
  numOfActions: Number,
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
