const express = require("express");
const router = express.Router();
const authorizationWsMiddleware = require("./../tools/websocket/authorizationWsMiddleware");
const schema = require("./../Models");

const changeUser = (connections) => {
  const connectionsArray = Object.keys(connections).map(
    (key) => connections[key]
  );
  connectionsArray.forEach((connection) => {
    connection.ws.send(
      JSON.stringify({
        type: "CHANGE_USERS",
        users: connectionsArray.map((connection) => connection.user),
      })
    );
  });
};

const connections = {};
router.ws("/", async (ws, req) => {
  await authorizationWsMiddleware(ws, req);
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
            text: data.message.text,
            user: data.message.user,
          });
          await message.save();
          Object.keys(connections).map((key) => {
            connection[key].ws.send(
              JSON.stringify({
                type: "GET_MESSAGE",
                message: message,
              })
            );
          });
          break;
        default:
          ws.send(JSON.stringify({ type: "error", error: "Wrong type." }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: "error", error: "Wrong request." }));
    }
  };
  ws.onclose = () => {
    delete connections[req.user._id];
    changeUser(connections);
  };
});

module.exports = router;
