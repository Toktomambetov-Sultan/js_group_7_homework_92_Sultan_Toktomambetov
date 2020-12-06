const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();

const connections = {};
router.ws("/", (ws, req) => {
  const id = nanoid();
  connections[id] = ws;
  ws.onopen = (message) => {
    console.log(message);
  };
  ws.onmessage = (message) => {
    ws.send("");
  };
  ws.onclose = (message) => {
    delete connections[id];
  };
});

module.exports = router;
