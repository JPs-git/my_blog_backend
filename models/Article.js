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
    required:true,
  },
  // 修改日期
  modiDate:{
    type:Date,
    default: Date.now
  },
  // 文章内容
  mainContent:{
    type:String,
    default:''
  },
  // 文章摘要
  abstract:{
    type:String,
    default:''
  },
  // 所属分类
  classify:{
    type:String,
    default:''
  },
  // 关键词
  keywords:{
    type:Array,
    default:[]
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

module.exports = Article = mongoose.model('article', ArticleSchema)
