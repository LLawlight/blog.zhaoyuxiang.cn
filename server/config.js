const config = {
  db: 'mongodb://127.0.0.1/blog_zhaoyuxiang',

  port: '3000',

  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,

  // github 登陆的配置
  GITHUB_OAUTH: {
    clientID: '3b361ba05ed0e5a820cd',
    clientSecret: '647e3d3233718af7ab2346bd27596aae8f912f82',
    callbackURL: 'http://localhost:8080/auth/github'
  }
};

config.GITHUB_OAUTH_ADDRESS = `http://github.com/login/oauth/authorize?response_type=code&client_id=${config.GITHUB_OAUTH.clientID}&redirect_uri=${config.GITHUB_OAUTH.callbackURL}`

module.exports = config;