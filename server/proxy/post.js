var models     = require('../models');
var Post      = models.Post;
var EventProxy = require('eventproxy');
var User       = require('./user');


exports.getFullPost = function (id, callback) {
  var proxy = new EventProxy();
  // var events = ['topic', 'author', 'replies'];
  // proxy
  //   .assign(events, function (topic, author, replies) {
  //     callback(null, '', topic, author, replies);
  //   })
  //   .fail(callback);
  var events = ['post', 'author'];
  proxy
    .assign(events, function (post, author) {
      callback(null, '', post, author);
    })
    .fail(callback);


  Post.findOne({_id: id, deleted: false}, proxy.done(function (post) {
    if (!post) {
      proxy.unbind();
      return callback(null, '此话题不存在或已被删除。');
    }

    proxy.emit('post', post);

    User.getUserById(post.author_id, proxy.done(function (author) {
      if (!author) {
        proxy.unbind();
        return callback(null, '话题的作者丢了。');
      }
      proxy.emit('author', author);
    }));

    // Reply.getRepliesByTopicId(post._id, proxy.done('replies'));
  }));
};

exports.getPostById = function (id, callback) {
  var proxy = new EventProxy();
  proxy.assign('post', function (post) {
    return callback(null, post);
  }).fail(callback);

  Post.findOne({_id: id}, proxy.done(function (post) {
    if (!post) {
      proxy.emit('post', null);
      return;
    }
    proxy.emit('post', post);
  }));
};

exports.newAndSave = function (title, content, theme, authorId, callback) {
  var post       = new Post();
  post.title     = title;
  post.content   = content;
  post.theme     = theme;
  post.author_id = authorId;

  post.save(callback);
};
