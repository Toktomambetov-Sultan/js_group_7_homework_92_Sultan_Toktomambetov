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
  connections[req.user._id] = { ws, user: req.user };

  ws.onmessage = async (message) => {
    try {
      let messages;
      const data = JSON.parse(message.data);
      switch (data.type) {
        case "INIT":
          messages = (
            await schema.Message.find()
              .populate("user")
              .sort({ datatime: -1 })
              .limit(30)
          ).reverse();
          changeUser(connections);
          ws.send(
            JSON.stringify({
              type: "INIT",
              messages,
            })
          );
          break;
        case "ADD_MESSAGE":
          const message = new schema.Message({
            text: data.text,
            user: req.user._id,
          });
          await message.save();
          messages = (
            await schema.Message.find()
              .populate("user")
              .sort({ datatime: -1 })
              .limit(30)
          ).reverse();

          Object.keys(connections).map((key) => {
            connections[key].ws.send(
              JSON.stringify({
                type: "GET_MESSAGE",
                messages,
              })
            );
          });
          break;
        case "DELETE_MESSAGE":
          if (req.user.role === "moderator") {
            await schema.Message.findByIdAndDelete(data.id);

            messages = (
              await schema.Message.find()
                .populate("user")
                .sort({ datatime: -1 })
                .limit(30)
            ).reverse();
            Object.keys(connections).map((key) => {
              connections[key].ws.send(
                JSON.stringify({
                  type: "DELETE_MESSAGE",
                  id: data.id,
                  messages,
                })
              );
            });
          } else {
            ws.send(
              JSON.stringify({
                type: "ERROR",
                error: "Wrong role.",
              })
            );
          }
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
