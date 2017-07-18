const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');
const session    = require('express-session');
const mongoose   = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const config      = require('./config');

require('./models');

const apiRouterV1 = require('./api_router_v1');
const auth        = require('./middlewares/auth');

// passport
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const githubStrategyMiddleware = require('./middlewares/github_strategy');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(require('cookie-parser')(config.session_secret));
app.use(session({
  secret: config.session_secret,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false,
  httpOnly: true
}));

// oauth 中间件
app.use(passport.initialize());

// github oauth
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(new GitHubStrategy(config.GITHUB_OAUTH, githubStrategyMiddleware));

app.use(auth.authUser);

var whitelist = [
  'http://localhost:8080',
  'http://zhaoyuxiang.cn',
  'https://zhaoyuxiang.cn'
]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.use('/api/v1', cors(corsOptions), apiRouterV1);

app.listen(config.port, function () {
  console.info('blog.zhaoyuxiang listening on port', config.port);
});

module.exports = app;
