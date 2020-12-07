const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  datatime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = MessageModel;
