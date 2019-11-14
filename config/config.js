let config = {
    PORT: 8900,
    mongodb: 'mongodb://localhost:27017/website',
    redis_host: '127.0.0.1',
    redis_db: '6379',
    redis_pwd: '',
    ENV: 'development',
    system_title: 'Koa demo',
    system_dex: '让我们一起，为梦想窒息!',
    session: {
        key: 'Allcure',
        maxAge: 86400000
    }
}
module.exports = config
