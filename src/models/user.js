
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/MyDatabase');

const { Schema } = mongoose;

const UserDetail = new Schema({
  username: String,
  password: String,
});
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

module.exports = UserDetails;
