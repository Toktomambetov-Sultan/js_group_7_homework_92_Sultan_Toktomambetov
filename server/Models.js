const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");

const User = mongoose.model("User", UserModel);

module.exports = {
  User,
};
