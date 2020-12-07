const mongoose = require("mongoose");

const MessageModel = require("./Models/MessageModel");
const UserModel = require("./Models/UserModel");

const User = mongoose.model("User", UserModel);
const Message = mongoose.model("Message", MessageModel);

module.exports = {
  User,
  Message,
};
