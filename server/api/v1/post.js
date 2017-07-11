var validator  = require('validator');
var models     = require('../../models');
var PostModel  = models.Post;
var UserModel  = models.User;
var User       = require('../../proxy').User;
var Post       = require('../../proxy').Post;
var EventProxy = require('eventproxy');
var config     = require('../../config');
var _          = require('lodash');

var index = function (req, res, next) {
  var page     = parseInt(req.query.page, 10) || 1;
  page         = page > 0 ? page : 1;
  var theme    = req.query.theme || 'all';
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

  PostModel.find(query, '', options, ep.done('posts'));

  ep.all('posts', function (posts) {
    posts.forEach(function (post) {
      UserModel.findById(post.author_id, ep.done(function (author) {
        post.author = _.pick(author, ['loginname', 'avatar_url']);
        ep.emit('author');
      }));
    });

    ep.after('author', posts.length, function () {
      posts = posts.map(function (post) {
        return _.pick(post, ['id', 'author_id', 'theme', 'summary', 'title', 'last_reply_at',
          'good', 'top', 'reply_count', 'visit_count', 'create_at_ago', 'author']);
      });

      res.send({success: true, data: posts});
    });
  });
};

exports.index = index;

var show = function (req, res, next) {
  var postId  = String(req.params.id);

  var ep      = new EventProxy();

  if (!validator.isMongoId(postId)) {
    res.status(400);
    return res.send({success: false, error_msg: '不是有效的话题id'});
  }

  ep.fail(next);

  Post.getFullPost(postId, ep.done(function (msg, post, author, replies) {
    if (!post) {
      res.status(404);
      return res.send({success: false, error_msg: '话题不存在'});
    }
    post = _.pick(post, ['id', 'author_id', 'tab', 'content', 'title', 'last_reply_at',
      'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author']);

    post.author = _.pick(author, ['loginname', 'avatar_url']);

    // post.replies = replies.map(function (reply) {
    //   reply.author = _.pick(reply.author, ['loginname', 'avatar_url']);
    //   reply =  _.pick(reply, ['id', 'author', 'content', 'ups', 'create_at', 'reply_id']);
    //   reply.reply_id = reply.reply_id || null;
    //
    //   if (reply.ups && req.user && reply.ups.indexOf(req.user.id) != -1) {
    //     reply.is_uped = true;
    //   } else {
    //     reply.is_uped = false;
    //   }
    //
    //   return reply;
    // });

    ep.emit('full_post', post)
  }));

  ep.all('full_post', function (full_post) {
    res.send({success: true, data: full_post});
  })

};

exports.show = show;

exports.put = function (req, res, next) {
  var title   = validator.trim(req.body.title || '');
  var theme   = validator.trim(req.body.theme || '');
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

  Post.newAndSave(title, content, theme, req.session.user._id, function (err, post) {
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
      user.post_count += 1;
      user.save();
      req.session.user = user;
      proxy.emit('user_update');
    }));
  });
};

exports.showEdit = function (req, res, next) {
  var post_id = req.query.id;

  Post.getPostById(post_id, function (err, post, tags) {
    if (!post) {
      res.json('此话题不存在或已被删除。');
      return;
    }

    if (String(post.author_id) === String(req.session.user._id) || req.session.user.is_admin) {
      res.json({
        data: {
          post_id: post._id,
          title: post.title,
          content: post.content,
          theme: post.theme
        },
        status: 200
      });
    } else {
      res.json('对不起，你不能编辑此话题。');
    }
  });
};

exports.update = function (req, res, next) {
  var post_id = _.trim(req.body.post_id);
  var title   = _.trim(req.body.title);
  var theme   = _.trim(req.body.theme);
  var content = _.trim(req.body.content);

  Post.getPostById(post_id, function (err, post, tags) {
    if (!post) {
      res.status(400);
      return res.send({success: false, error_msg: '此文章不存在或已被删除。'});
    }

    if (post.author_id.equals(req.session.user._id) || req.session.user.is_admin) {
      // 验证
      var editError;
      if (title === '') {
        editError = '标题不能是空的。';
      } else if (!theme) {
        editError = '必须选择一个主题。';
      }
      // END 验证

      if (editError) {
        return res.send({success: false, error_msg: editError});
      }

      //保存话题
      post.title     = title;
      post.content   = content;
      post.theme     = theme;
      post.update_at = new Date();

      post.save(function (err) {
        if (err) {
          return next(err);
        }

        res.send({
          success: true,
          post_id: post.id
        });
      });
    } else {
      res.status(403)
      return res.send({success: false, error_msg: '对不起，你不能编辑此文章。'});
    }
  });
};
