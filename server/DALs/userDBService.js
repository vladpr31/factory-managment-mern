const User = require("../models/userModal");

//Users Functions

//returns all users.
const getAllUsers = () => {
  return User.find({});
};
//returns user by id.
const getUserById = (id) => {
  return User.findById(id);
};
//returns user by Full Name.
const getUserByName = (name) => {
  return User.findOne({ fullName: name });
};
//updates user by id, and returns new document. upsert:false so it wont create a new document if doesnt exists.
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
//deletes users.
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
