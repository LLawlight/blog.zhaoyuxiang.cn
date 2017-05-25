var Models         = require('../models');
var User           = Models.User;
var authMiddleWare = require('../middlewares/auth');
var tools          = require('../common/tools');
var eventproxy     = require('eventproxy');
var uuid           = require('node-uuid');
var validator      = require('validator');

exports.callback = function (req, res, next) {
  var profile = req.user;
  profile.email = profile.emails && profile.emails[0] && profile.emails[0].value;
  var userInfo = {
    avatar: profile._json.avatar_url,
    name: profile.username
  }
  User.findOne({githubId: profile.id}, function (err, user) {
    if (err) {
      return next(err);
    }
    // 当用户已经是 cnode 用户时，通过 github 登陆将会更新他的资料
    if (user) {
      user.githubUsername = profile.username;
      user.githubId = profile.id;
      user.githubAccessToken = profile.accessToken;
      // user.loginname = profile.username;
      user.avatar = profile._json.avatar_url;
      user.email = profile.email || user.email;

      user.save(() => {
        res.json({
          status: '200',
          message: 'success',
          data: userInfo
        })
      });
    } else {
      // 如果用户还未存在，则建立新用户
      req.session.profile = profile;
      create(profile, () => {
        res.json({
          status: '200',
          message: 'success',
          data: userInfo
        })
      })
    }
  });
};

function create(profile, callback) {
  var user = new User({
    loginname: profile.username,
    pass: profile.accessToken,
    email: profile.email,
    avatar: profile._json.avatar_url,
    githubId: profile.id,
    githubUsername: profile.username,
    githubAccessToken: profile.accessToken,
    active: true,
    accessToken: uuid.v4(),
  });
  user.save(callback);
}
