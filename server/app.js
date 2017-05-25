const bodyParser = require('body-parser');
const cors       = require('cors');
const express    = require('express');

const apiRouterV1 = require('./api_router_v1');
const config      = require('./config');

require('./models');

// passport
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy;
const githubStrategyMiddleware = require('./middlewares/github_strategy');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

app.use('/api/v1', cors(), apiRouterV1);

app.listen(config.port, function () {
  console.info('blog.zhaoyuxiang listening on port', config.port);
});

module.exports = app;
