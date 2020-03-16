const mongoose = require('mongoose');
const crypto = require('crypto');

const schema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  dateOfBirth: Date,
  email: String,
  balance: Number,
  nOfGames: Number,
  nOfWins: Number,
  nOfDraws: Number,
  nOfLosses: Number
}, {
  strict: true
});

schema.methods.getHash = getHash;
schema.methods.validatePassword = validatePassword;

function getHash(password) {
  return crypto.createHash('md5').update(password).digest("hex");
}

function validatePassword(hash, password) {
  return (hash || this.hash) === crypto.createHash('md5').update(password).digest("hex");
};

module.exports = mongoose.model('User', schema);