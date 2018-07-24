const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/news4uindex');

module.exports = {
  Article: require('./article'),
  User: require('./user')
}
