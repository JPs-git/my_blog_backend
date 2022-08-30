const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const bodyparser = require('koa-bodyparser')
const passport = require('koa-passport')

// 实例化koa
const app = new koa()
const router = new Router()

app.use(bodyparser())
app.use(passport.initialize())
app.use(passport.session())




// 路由

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello koa interfaces' }
})

//config
const db = require('./conf/env').dbURL

//连接数据库
//mongoose.connect('mongodb://数据库ip:端口号/数据库名'，{useMongoClient: true})
//  - 端口默认27017可省略
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...')
  })
  .catch((err) => {
    console.log(err)
  })
// 引入路由文件
const articles = require('./routes/api/articles')
//配置路由地址
router.use('/api/articles', articles)
// 配置路由
app.use(router.routes()).use(router.allowedMethods())


// 配置swagger
const { koaSwagger } = require('koa2-swagger-ui')

app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  },
}))
const swagger = require('./utils/swagger')
app.use(swagger.routes(), swagger.allowedMethods())


// 配置端口 开始监听
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on ${port}`)
})
