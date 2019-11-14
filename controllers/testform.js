const testForm = {
    async testform (ctx, next) {
        await ctx.render('testform', {})
    },
    async addForm (ctx, next) {
        console.log('.................ddd:', ctx)
        await ctx.render('testform', {})
    }
}

module.exports = testForm;