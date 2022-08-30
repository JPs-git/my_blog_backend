const Router = require('koa-router')
const router = new Router()
// 引入modle
const Article = require('../../models/Article')

/**
 * @route GET api/articles/
 * @description 测试接口
 * @access      接口公开
 */

 router.get('/', async (ctx) => {
  ctx.status = 200
  ctx.body = { msg: 'articles ok...' }
})

module.exports = router.routes()