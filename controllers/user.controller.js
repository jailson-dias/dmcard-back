const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const User = db.User;

module.exports = {
  authenticate,
  // getAll,
  // getById,
  create,
  // update,
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

// async function getAll() {
//   return await User.find().select("-hash");
// }

// async function getById(id) {
//   return await User.findById(id).select("-hash");
// }

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

// async function update(id, userParam) {
//   const user = await User.findById(id);

//   // validate
//   if (!user) throw "User not found";
//   if (
//     user.username !== userParam.username &&
//     (await User.findOne({ username: userParam.username }))
//   ) {
//     throw 'Username "' + userParam.username + '" is already taken';
//   }

//   // hash password if it was entered
//   if (userParam.password) {
//     userParam.hash = bcrypt.hashSync(userParam.password, 10);
//   }

//   // copy userParam properties to user
//   Object.assign(user, userParam);

//   await user.save();
// }

function _delete(id) {
  return User.findByIdAndRemove(id);
}
