const express           = require('express');
const router            = express.Router();

const config            = require('./config');
const sign              = require('./controllers/sign');
const userController    = require('./api/v1/user');

// router.get('/user/:loginname', userController.show);

// sign controller
if (config.allow_sign_up) {
  // router.get('/signup', sign.showSignup);  // 跳转到注册页面
  router.post('/signup', sign.signup);  // 提交注册信息
} else {
  // 进行github验证
  // router.get('/signup', function (req, res, next) {
  //   return res.redirect('/auth/github')
  // });
}

module.exports = router;
