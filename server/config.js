const path = require("path");
const rootDir = __dirname;
module.exports = {
  port: 8000,
  ImageUploadingDir: path.join(rootDir, "public/images"),
  rootDir,
  FixturesImagesDir: path.join(rootDir, "fixtures/images"),
  GoogleClientId:
  "380937490366-d5b0il4o3j3too2jgu7tkatu1dr7ra9j.apps.googleusercontent.com",
  db: {
    name: "chat",
    url: "mongodb://localhost:27017/",
  },
};
