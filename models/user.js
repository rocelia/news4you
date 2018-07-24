const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  createdAt: Date
})

const UserSchema = new mongoose.model(UserSchema, 'User');

module.exports = User;