const db = require("../_helpers/db");
const RequestCreditCard = db.RequestCreditCard;

module.exports = {
  getAll,
  getAccepted,
  getRefused,
  create,
  delete: _delete
};

function calculateCredit({ income }) {
  let score = Math.floor(Math.random() * 999) + 1;
  let credit = 0;
  if (score < 300) {
    credit = 0;
  } else if (score < 600) {
    credit = 1000;
  } else if (score < 800) {
    credit = Math.max(income / 2, 1000);
  } else if (score <= 950) {
    credit = income * 2;
  } else if (score > 950) {
    credit = 1000000;
  }
  return {
    score,
    credit
  };
}

function create({ name, email, cpf, phone, income }) {
  return RequestCreditCard.findOne({ cpf }).then(request => {
    if (request) {
      throw 'The "' + cpf + '" is already requested credit card';
    }

    request = new RequestCreditCard({
      name,
      email,
      cpf,
      phone,
      income,
      ...calculateCredit({ income })
    });
    return request.save();
  });
}

function getAll() {
  return RequestCreditCard.find().sort("-updatedAt");
}

function getAccepted() {
  return RequestCreditCard.find({ credit: { $gt: 0 } }).sort("-updatedAt");
}

function getRefused() {
  return RequestCreditCard.find({ credit: 0 }).sort("-updatedAt");
}

function _delete(id) {
  return RequestCreditCard.findByIdAndRemove(id);
}
