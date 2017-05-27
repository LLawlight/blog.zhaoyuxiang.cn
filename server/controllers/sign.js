var validator  = require('validator');
var eventproxy = require('eventproxy');
var User       = require('../proxy').User;

exports.signup = (req, res, next) => {
  let loginname = validator.trim(req.body.loginname).toLowerCase();
  let email     = validator.trim(req.body.email).toLowerCase();
  let pass      = validator.trim(req.body.pass);
  let rePass    = validator.trim(req.body.re_pass);

  const ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (msg) {
    res.status(422);
    res.json({error: msg, loginname: loginname, email: email});
  });

  // 验证信息的正确性
  if ([loginname, pass, rePass, email].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', '信息不完整。');
    return;
  }
  if (loginname.length < 5) {
    ep.emit('prop_err', '用户名至少需要5个字符。');
    return;
  }
  if (!tools.validateId(loginname)) {
    return ep.emit('prop_err', '用户名不合法。');
  }
  if (!validator.isEmail(email)) {
    return ep.emit('prop_err', '邮箱不合法。');
  }
  if (pass !== rePass) {
    return ep.emit('prop_err', '两次密码输入不一致。');
  }
  // END 验证信息的正确性
}
