const config = {
  db: 'mongodb://127.0.0.1/blog_zhaoyuxiang',

  port: 3000,

  list_count: 20,

  session_secret: 'blog_zhaoyuxiang_secret',
  auth_cookie_name: 'blog_zhaoyuxiang',

  // mongo 配置，默认是本地
  mongo_host: '127.0.0.1',
  mongo_port: 27017,
  mongo_db: 'blog_zhaoyuxiang',
  mongo_password: '',

  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,

  admins: { LLawlight: true }
};

if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  config.GITHUB_OAUTH = {
    clientID: '8c2e74aa37f3b12445dd',
    clientSecret: '3e9d24e2f0e59177efe83a5590a36139071a4f59',
    callbackURL: 'http://localhost:8080/auth/github'
  }
}
else {
  // github 登陆的配置
  config.GITHUB_OAUTH = {
    clientID: '3b361ba05ed0e5a820cd',
    clientSecret: 'af63000a4cf4c0311c6df7d96e528586b5f455e1',
    callbackURL: 'https://zhaoyuxiang.cn/auth/github'
  }
}

config.GITHUB_OAUTH_ADDRESS =
'http://github.com/login/oauth/authorize?response_type=code&client_id=' +
config.GITHUB_OAUTH.clientID +
'&redirect_uri=' +
config.GITHUB_OAUTH.callbackURL;

module.exports = config;
