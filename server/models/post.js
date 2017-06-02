var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var _         = require('lodash');
var removeMd = require('remove-markdown');
var moment = require('moment');
moment.locale('zh-cn');

var PostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  top: { type: Boolean, default: false }, // 置顶帖
  good: {type: Boolean, default: false}, // 精华帖
  lock: {type: Boolean, default: false}, // 被锁定主题
  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  theme: {type: String},
  deleted: {type: Boolean, default: false},
});

PostSchema.virtual('summary').get(function() {
  var summary = removeMd(this.content).slice(0, 88);

  return summary;
});

PostSchema.virtual('create_at_ago').get(function() {
  return moment(this.create_at).format('YYYY年M月D日 HH:mm');
});

PostSchema.index({create_at: -1});
PostSchema.index({top: -1, last_reply_at: -1});
PostSchema.index({author_id: 1, create_at: -1});

mongoose.model('Post', PostSchema);
