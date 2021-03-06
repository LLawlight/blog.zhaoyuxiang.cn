var models  = require('../models');
var User    = models.User;
var utility = require('utility');
var uuid    = require('node-uuid');

exports.getUserById = function (id, callback) {
  if (!id) {
    return callback();
  }
  User.findOne({_id: id}, callback);
};

exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, '', opt, callback);
};

exports.newAndSave = function (name, loginname, pass, email, avatar_url, active, callback) {
  var user         = new User();
  user.name        = loginname;
  user.loginname   = loginname;
  user.pass        = pass;
  user.email       = email;
  user.avatar      = avatar_url;
  user.active      = active || false;
  user.accessToken = uuid.v4();

  user.save(callback);
};

var makeGravatar = function (email) {
  return 'http://www.gravatar.com/avatar/' + utility.md5(email.toLowerCase()) + '?size=48';
};
exports.makeGravatar = makeGravatar;
