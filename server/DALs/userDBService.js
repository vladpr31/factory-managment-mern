const User = require("../models/userModal");

//Users Functions

const getAllUsers = () => {
  return User.find({});
};
const getUserById = (id) => {
  return User.findById(id);
};
const getUserByName = (name) => {
  return User.findOne({ fullName: name });
};

const updateUserInfo = (id, updatedUser) => {
  const newName = updatedUser.firstName + " " + updatedUser.lastName;
  return User.findByIdAndUpdate(
    { _id: id },
    { fullName: newName },
    { upsert: false, new: true }
  ).then((updated) => {
    return updated;
  });
};

const deleteUser = (id) => {
  User.findByIdAndDelete(id);
  return "User Deleted.";
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  updateUserInfo,
  deleteUser,
};
