const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const {
  emailValidator,
  cpfValidator,
  phoneValidator
} = require("../_helpers/validators");

const schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: emailValidator,
      message: props => `${props.value} is not a valid e-mail!`
    }
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: cpfValidator,
      message: props => `${props.value} is not a valid CPF number!`
    }
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: phoneValidator,
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("RequestCreditCard", schema);
