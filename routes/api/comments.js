const Router = require('koa-router')
const router = new Router()
// 引入modle
const Comment = require('../../models/Comment')
const Article = require('../../models/Article')

/**
 * @route GET api/comments/test
 * @description 测试接口
 * @access      接口公开
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = { msg: 'comments ok...' }
})

/**
 * @route POST api/comments
 * @description 新增一条评论
 * @access      接口公开
 */
router.post('/', async (ctx) => {
  const newComment = new Comment()
  const body = ctx.request.body
  Object.keys(body).forEach((key) => {
    newComment[key] = body[key]
  })
  await newComment.save()
  // 重新统计文章评论数
  if(body.comment_type === 'article'){
    let comment_num = 
    await Comment.find({article_id: body.article_id}).count()
    console.log(comment_num)
    await Article.findByIdAndUpdate(body.article_id, {comments: comment_num})
  }
  ctx.status = 201
  ctx.body = { success: true }
})

/**
 * @route GET api/comments/msgboard
 * @description 查找留言板的评论
 * @access      接口公开
 */
router.get('/msgboard', async (ctx) => {
  const limit_num = 10
  const skip_num = ctx.request.query.skip * limit_num
  const findResult = await Comment.find({ comment_type: 'msgboard' }, null, {
    limit: limit_num,
    skip: skip_num,
    sort: { _id: -1 },
  })
  const total = Math.ceil(await Comment.find({ comment_type: 'msgboard' }).count() / limit_num)
  ctx.status = 200
  ctx.body = { data: { findResult,  total} }
})

/**
 * @route GET api/comments/:id
 * @description 查找指定id评论
 * @access      接口公开
 */
router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const findResult = await Comment.findById(id)
  ctx.body = { data: { findResult } }
})

/**
 * @route GET api/comments/article_id/:id
 * @description 查找指定文章id所有评论
 * @access      接口公开
 */
router.get('/article_id/:id', async (ctx) => {
  const limit_num = 10
  const skip_num = ctx.request.query.skip * limit_num
  const { id } = ctx.params
  const findResult = await Comment.find({ article_id: id}, null, {
    limit: limit_num,
    skip: skip_num,
    sort: { _id: -1 },
  })
  const total = Math.ceil(await Comment.find({ article_id: id }).count() / limit_num)
  ctx.body = { data: { findResult, total } }
})

/**
 * @route PATCH api/comments/:id
 * @description 部分修改指定id的评论
 * @access      接口公开
 */
router.patch('/:id', async (ctx) => {
  const { id } = ctx.params
  const update = ctx.request.body
  await Comment.findByIdAndUpdate(id, update)
  ctx.status = 200
  ctx.body = { success: true }
})

/**
 * @route DELETE api/comments/:id
 * @description 删除指定id的评论及子评论
 * @access      接口公开
 */
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  // 删除子评论
  await Comment.deleteMany({ root_id: id })
  await Comment.findByIdAndDelete(id)
  ctx.status = 204
})

/**
 * @route DELETE api/comments/:id
 * @description 删除指定id的评论
 * @access      接口公开
 */

module.exports = router.routes()
