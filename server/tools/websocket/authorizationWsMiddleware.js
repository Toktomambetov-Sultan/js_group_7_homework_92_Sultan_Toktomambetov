const schema = require("./../../Models");
const authorizationWsMiddleware = async (ws, req) => {
  try {
    const { token } = req.query;
    const user = await schema.User.findOne({
      token,
    });
    if (!user) {
      return ws.close(
        1005,
        JSON.stringify({ type: "Error", error: "Token is wrong." })
      );
    }
    req.user = { ...user.toObject() };
    delete req.user.token;
  } catch (error) {
    ws.close(
      1007,
      JSON.stringify({
        type: "Error",
        error: "Client's request error.",
      })
    );
  }
};
module.exports = authorizationWsMiddleware;
