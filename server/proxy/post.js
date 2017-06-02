var models     = require('../models');
var Post      = models.Post;
var EventProxy = require('eventproxy');


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
