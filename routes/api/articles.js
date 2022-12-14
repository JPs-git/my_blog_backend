const Router = require('koa-router')
const router = new Router()
// 引入modle
const Article = require('../../models/Article')

/**
 * @route GET api/articles/test
 * @description 测试接口
 * @access      接口公开
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = { msg: 'articles ok...' }
})

/**
 * @route POST api/articles/
 * @description 新增一篇文章
 * @access      接口公开
 */
router.post('/', async (ctx) => {
  const newArticle = new Article()
  const body = ctx.request.body
  Object.keys(body).forEach((key) => {
    newArticle[key] = body[key]
  })
  await newArticle.save()
  ctx.status = 201
  ctx.body = { success: true }
})

/**
 * @route GET api/articles/
 * @description 获取所有文章 (按照时间排序)
 * @access      接口公开
 */
router.get('/', async (ctx) => {
  const query = { isActive: true }
  const findResult = await Article.find(query).sort({'_id':-1})
  ctx.status = 200
  ctx.body = { status: ctx.status, data: { findResult } }
})

/**
 * @route GET api/articles/:id
 * @description 获取指定id的文章
 * @access      接口公开
 */
router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  const findResult = await Article.findById(id)
  ctx.body = { data: { findResult } }
})

/**
 * @route PATCH api/articles/like/:id
 * @description 修改点赞数
 * @access      接口公开
 */
 router.patch('/like/:id', async (ctx) => {
  const { id } = ctx.params
  const is_like = ctx.request.body.like
  const findResult = await Article.findById(id) 
  let old_likes = findResult.likes
  let new_likes = old_likes
  if(is_like){
    // like数加一
    new_likes = ++old_likes
  }else{
    // like减一
    new_likes = --old_likes
  }
  await Article.findByIdAndUpdate(id, {likes: new_likes})
  ctx.status = 200
  ctx.body = { success : true, like: is_like}
})

/**
 * @route PATCH api/articles/:id
 * @description 部分修改指定id的文章
 * @access      接口公开
 */
router.patch('/:id', async (ctx) => {
  const { id } = ctx.params
  const update = ctx.request.body
  update.modiDate = Date.now()
  await Article.findByIdAndUpdate(id, update)
  ctx.status = 200
  ctx.body = { success: true }
})

/**
 * @route DELETE api/articles/:id
 * @description 删除指定id的文章
 * @access      接口公开
 */
router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  await Article.findByIdAndDelete(id)
  ctx.status = 204
})

module.exports = router.routes()
