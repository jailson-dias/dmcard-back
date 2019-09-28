const emailValidator = function(v) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    v
  );
};

const cpfValidator = function(v) {
  return /\d{11}/.test(v);
};

const phoneValidator = function(v) {
  return /\d{11}/.test(v);
};

module.exports = {
  emailValidator,
  cpfValidator,
  phoneValidator
};
