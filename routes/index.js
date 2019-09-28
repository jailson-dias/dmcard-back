var express = require("express");
var app = express.Router();

app.use("/users", require("./user.route"));
app.use("/credit/request", require("./requestCreditCard.route"));

module.exports = app;
