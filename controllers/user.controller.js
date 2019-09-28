const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  getById,
  create,
  delete: _delete
};

function authenticate({ username, password }) {
  return User.findOne({ username }).then(user => {
    if (user && bcrypt.compareSync(password, user.hash)) {
      const { hash, _id, __v, ...userWithoutHash } = user.toObject();
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
        ...userWithoutHash,
        token
      };
    }
  });
}

function getById(id) {
  return User.findById(id).select("-hash");
}

function create(userParam) {
  return User.findOne({ username: userParam.username })
    .then(user => {
      if (user) {
        throw 'Username "' + userParam.username + '" is already taken';
      }
      user = new User(userParam);

      // hash password
      if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
      }
      return user.save();
    })
    .then(user => {
      return {
        username: user.username,
        name: user.name
      };
    });
}

function _delete(id) {
  return User.findByIdAndRemove(id);
}
