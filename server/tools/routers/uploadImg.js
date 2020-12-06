const multer = require("multer");
const config = require("./../../config");
const { nanoid } = require("nanoid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ImageUploadingDir);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    return callback(null, true);
  },
});

module.exports = uploadImage;
