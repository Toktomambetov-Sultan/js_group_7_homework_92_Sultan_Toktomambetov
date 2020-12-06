const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const uniqueValidate = require("../tools/models/uniqueValidate");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: uniqueValidate("User", "username"),
  },
  avatarImage: String,
  password: {
    required: true,
    type: String,
    validate: {
      validator: (value) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g.test(
          value
        );
      },
      message: "Password is very ease.",
    },
  },
  displayName: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    default: "user",
    type: String,
    enum: ["moderator", "user"],
  },
  token: {
    type: String,
    required: true,
  },
});
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserModel.set("toJSON", {
  transform: (doc, ret, option) => {
    delete ret.password;
    return ret;
  },
});

UserModel.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserModel.methods.generateToken = function () {
  this.token = nanoid();
};

module.exports = UserModel;
