const express          = require('express');
const passport         = require('passport');

const config           = require('./config');
const auth             = require('./middlewares/auth');
const githubMiddleware = require('./middlewares/github');
const configMiddleware = require('./middlewares/conf');
const github           = require('./controllers/github');
// const limit            = require('./middlewares/limit');
const sign             = require('./controllers/sign');
const userController   = require('./api/v1/user');
const postController   = require('./api/v1/post');

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
router.post('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/signin' }), github.callback);

// 用户类
router.get('/user/login', userController.login);

// 文章类
router.get('/post/:id', postController.show);
router.post('/post/create', auth.adminRequired, postController.put);
router.get('/posts', postController.index);
router.get('/post/edit', postController.showEdit);
router.post('/post/update', postController.update);

module.exports = router;
