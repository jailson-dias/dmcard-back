const expressJwt = require("express-jwt");
const config = require("../config.json");
const userController = require("../controllers/user.controller");

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register",
      { url: "/credit/request", methods: ["POST"] }
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userController.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
