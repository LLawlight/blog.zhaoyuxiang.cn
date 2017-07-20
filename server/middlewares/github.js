const axios = require('axios');
const config = require('../config');

exports.getGithubUser = function (req, res, next) {
  axios.post('https://github.com/login/oauth/access_token', {
    client_id: config.GITHUB_OAUTH.clientID,
    client_secret: config.GITHUB_OAUTH.clientSecret,
    code: req.query.code
  })
  .then(function (response1) {
    console.log('response1', response1);
    const accessToken = response1.data.split('&')[0].split('=')[1]
    axios.get('https://api.github.com/user', {
      params: {
        access_token: accessToken
      }
    })
    .then(function (response2) {
      console.log('response2');
      const data2 = response2.data
      req.user = {
        username: data2.login,
        accessToken: accessToken,
        email: data2.email,
        id: data2.id,
        _json: {
          avatar_url: data2.avatar_url
        }
      }

      next();
    })
    .catch(function (error) {
      console.log('error2');
      res.status(403)
      res.json({
        success: false,
        message: 'Github认证失败'
      })
    });
  })
  .catch(function (error) {
    console.log('error1', error);
    res.status(403)
    res.json({
      success: false,
      message: 'Github认证失败'
    })
  });
};
