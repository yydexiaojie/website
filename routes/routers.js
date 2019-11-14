const Router = require('koa-router')()

const home = require('../controllers/home.js')
const testform = require('../controllers/testform.js')
const letv = require('../controllers/letvapi/letvapi.js')

module.exports = (app) => {
    Router.get('/', testform.testform)
    Router.post('/addform', testform.addForm)
    // Router.get('/', letv.index)
    Router.get('/letvurl', letv.letvinfo)

    app.use(Router.routes())
       .use(Router.allowedMethods())

     //404
    app.use(async (ctx, next) => {
        await ctx.render('404', {
            title: 'Page not find...'
        })
    })
}
