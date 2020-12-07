const express = require("express");
const router = express.Router();
const authorizationWsMiddleware = require("./../tools/websocket/authorizationWsMiddleware");
const schema = require("./../Models");

const changeUser = (connections) => {
  const connectionsArray = Object.keys(connections).map(
    (key) => connections[key]
  );
  connectionsArray.forEach((connection) => {
    try {
      connection.ws.send(
        JSON.stringify({
          type: "CHANGE_USERS",
          users: connectionsArray.map((connection) => connection.user),
        })
      );
    } catch (error) {
      console.log(error);
    }
  });
};

const connections = {};
router.ws("/", async (ws, req) => {
  await authorizationWsMiddleware(ws, req);
  console.log(req.user);
  connections[req.user._id] = { ws, user: req.user };

  ws.onmessage = async (message) => {
    try {
      let users;
      let messages;
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "INIT":
          changeUser(connections);
          users = Object.keys(connections).map((key) => connections[key].user);
          messages = await schema.Message.find()
            .populate("user")
            .sort({ datatime: -1 })
            .limit(30);
          ws.send(
            JSON.stringify({
              type: "INIT",
              users,
              messages,
            })
          );
          break;
        case "ADD_MESSAGE":
          const message = new schema.Message({
            text: data.text,
            user: req.user._id,
          });
          await (await message.save()).populate("user").execPopulate();
          Object.keys(connections).map((key) => {
            connections[key].ws.send(
              JSON.stringify({
                type: "GET_MESSAGE",
                message,
              })
            );
          });
          break;
        default:
          ws.send(JSON.stringify({ type: "ERROR", error: "Wrong type." }));
      }
    } catch (error) {
      console.log(error);
      ws.send(JSON.stringify({ type: "ERROR", error: "Wrong request." }));
    }
  };
  ws.onclose = () => {
    delete connections[req.user._id];
    changeUser(connections);
  };
});

module.exports = router;
