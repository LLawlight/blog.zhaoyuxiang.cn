var validator    = require('validator');
var models       = require('../../models');
var TopicModel   = models.Topic;
var UserModel     = models.User;
var User         = require('../../proxy').User;
var Topic        = require('../../proxy').Topic;
var EventProxy   = require('eventproxy');
var config       = require('../../config');
var _            = require('lodash');

var index = function (req, res, next) {
  var page     = parseInt(req.query.page, 10) || 1;
  page         = page > 0 ? page : 1;
  var theme      = req.query.theme || 'all';
  var limit    = Number(req.query.limit) || config.list_count;

  var query = {};
  if (theme && theme !== 'all') {
    if (theme === 'good') {
      query.good = true;
    } else {
      query.theme = theme;
    }
  }
  query.deleted = false;
  var options = { skip: (page - 1) * limit, limit: limit, sort: '-top -last_reply_at'};

  var ep = new EventProxy();
  ep.fail(next);

  TopicModel.find(query, '', options, ep.done('topics'));

  ep.all('topics', function (topics) {
    topics.forEach(function (topic) {
      UserModel.findById(topic.author_id, ep.done(function (author) {
        topic.author = _.pick(author, ['loginname', 'avatar_url']);
        ep.emit('author');
      }));
    });

    ep.after('author', topics.length, function () {
      topics = topics.map(function (topic) {
        return _.pick(topic, ['id', 'author_id', 'theme', 'content', 'title', 'last_reply_at',
          'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author']);
      });

      res.send({success: true, data: topics});
    });
  });
};

exports.index = index;

exports.put = function (req, res, next) {
  var title   = validator.trim(req.body.title || '');
  var theme     = validator.trim(req.body.theme || '');
  var content = validator.trim(req.body.content || '');

  // 验证
  var editError;
  if (title === '') {
    editError = '标题不能是空的';
  } else if (!theme) {
    editError = '必须选择一个分类';
  } else if (content === '') {
    editError = '内容不可为空';
  }
  // END 验证

  if (editError) {
    res.status(422);
    return res.json({
      edit_error: editError,
      title: title,
      content: content,
      theme: theme
    });
  }

  Topic.newAndSave(title, content, theme, req.session.user._id, function (err, topic) {
    if (err) {
      return next(err);
    }

    var proxy = new EventProxy();

    proxy.all('user_update', function () {
      res.json({
        status: '200',
        message: 'success'
      });
    });
    proxy.fail(next);
    User.getUserById(req.session.user._id, proxy.done(function (user) {
      user.topic_count += 1;
      user.save();
      req.session.user = user;
      proxy.emit('user_update');
    }));
  });
};
