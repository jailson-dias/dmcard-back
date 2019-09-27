const emailValidator = function(v) {
  return /[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?/.test(v);
};

const cpfValidator = function(v) {
  return /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(v);
};

const phoneValidator = function(v) {
  return /\(\d{2}\)\ \d{5}\ \d{4}/.test(v);
};

module.exports = {
  emailValidator,
  cpfValidator,
  phoneValidator
};
