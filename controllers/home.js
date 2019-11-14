module.exports = {
    async index (ctx, next) {
        let content = {
            page: 5,
            body: '都要尊敬我们最敬爱的人-中国人民解放军'
        }
        await ctx.render('index', {
            title: 'Koa demo',
            content
        })
    }
}
