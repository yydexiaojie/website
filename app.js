const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const multer = require('koa-multer')
const path = require('path')
const router = require('./routes/routers')
const mongoose = require('mongoose')
const config = require('./config/config')

const render = require('koa-art-template')

//mongodb dbs
mongoose.connect(config.mongodb, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
})

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// app.use(async (ctx, next) => {
//  ctx.set('Access-Control-Allow-Origin', '*');
//  await next();
// });

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
