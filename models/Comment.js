const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  // 所属文章外键
  article_id:{
    type:String,
    required:true
  },
  // 文章还是留言
  comment_type:{
    type:String,
    required:true
  },
  content:{
    type:String,
    default:''
  },
  // 所属的根评论
  root_id:{
    type:String,
    default:null
  },
  // 发布时间
  pub_date:{
    type:Date,
    default:Date.now()
  }
})

module.exports  = mongoose.model('comment', CommentSchema)
