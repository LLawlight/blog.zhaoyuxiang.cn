const express          = require('express');
const passport         = require('passport');

const config           = require('./config');
const auth             = require('./middlewares/auth');
const configMiddleware = require('./middlewares/conf');
const github           = require('./controllers/github');
// const limit            = require('./middlewares/limit');
const sign             = require('./controllers/sign');
const userController   = require('./api/v1/user');
const topicController   = require('./api/v1/topic');

const router           = express.Router();

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

// github oauth
// router.get('/auth/github', configMiddleware.github, passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/signin' }),
  github.callback);

// 保存新建的文章
router.post('/topic/create', auth.adminRequired, topicController.put);
router.get('/topics', topicController.index);

module.exports = router;
