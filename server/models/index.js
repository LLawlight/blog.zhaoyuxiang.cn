const mongoose = require('mongoose');
const config   = require('../config');

mongoose.connect(config.db, {
  server: {poolSize: 20}
},  (err) => {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

require('./user');

exports.User = mongoose.model('User');
