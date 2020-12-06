const express = require("express");
const enableWs = require("express-ws");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const app = express();
enableWs(app);

const chatRouter = require("./routers/chatRouter");
const userRouter = require("./routers/userRouter");

const run = async () => {
  try {
    await mongoose.connect(config.db.url + config.db.name, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
    });
  } catch (error) {
    console.error(error);
    return;
  }
  app.use(cors());
  app.use(express.static("public"));
  app.use(express.json());

  app.use("/chat", chatRouter);
  app.use("/users", userRouter);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port.`);
  });
};

run();
