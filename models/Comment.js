const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
  // 所属文章外键
  article_id:{
    type:String,
    default:''
  },
  // 文章还是留言
  comment_type:{
    type:String,
    required:true
  },
  context:{
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
  },
  // 昵称
  nickname:{
    type:String,
    required:true
  },
  // 邮箱
  email:{
    type:String,
    required:true
  },
  // 链接
  linkURL:{
    type:String,
    required:true
  }
})

module.exports  = mongoose.model('comment', CommentSchema)
