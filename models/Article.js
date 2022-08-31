const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例化模板
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // 发布日期
  pubDate: {
    type: Date,
    default: Date.now(),
    // required:true,
  },
  // 修改日期
  modiDate: {
    type: Date,
    default: Date.now(),
  },
  // 文章内容
  mainContent: {
    type: String,
    default: '',
  },
  // 文章摘要
  abstract: {
    type: String,
    default: '',
  },
  // 所属分类
  classify: {
    type: String,
    default: '',
  },
  // 关键词
  keywords: {
    type: Array,
    default: [],
  },
  // 点赞数
  likes: {
    type: Number,
    default: 0,
  },
  // 评论数
  comments: {
    type: Number,
    default: 0,
  },
  // 浏览数
  views: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

module.exports = Article = mongoose.model('article', ArticleSchema)
