const eventproxy   = require('eventproxy');
const UserProxy    = require('../../proxy').User;
var config     = require('../../config');
var models  = require('../../models');
var UserModel    = models.User;
var _          = require('lodash');

var login = function (req, res, next) {
  var auth_token = req.signedCookies[config.auth_cookie_name];
  if (!auth_token) {
    return res.send({success: false, error_msg: '用户未登录'});
  }

  var auth = auth_token.split('$$$$');
  var user_id = auth[0];
  UserProxy.getUserById(user_id, function (err, user) {
    if (!user) {
      return res.send({success: false, error_msg: '用户未登录'});
    }
    user = res.locals.current_user = req.session.user = new UserModel(user);

    user = _.pick(user, ['avatar', 'loginname', 'id']);

    if (config.admins.hasOwnProperty(user.loginname)) {
      user.is_admin = true;
    }

    res.send({success: true, data: user});
  });
};

exports.login = login;
