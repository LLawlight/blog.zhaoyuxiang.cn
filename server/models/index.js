var mongoose = require('mongoose');
var config   = require('../config');

mongoose.connect(config.db, {
  server: {poolSize: 20}
},  (err) => {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

require('./user');
require('./post');

exports.User = mongoose.model('User');
exports.Post = mongoose.model('Post');
