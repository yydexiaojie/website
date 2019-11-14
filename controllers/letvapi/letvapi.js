const http = require('http')
const utility = require('utility')
const qs = require('querystring')
const urlencode = require('urlencode')

let URL = 'http://api.letvcloud.com/open.php?'
let API = 'video.download'

function objKeySort (obj) {
    let newkey = Object.keys(obj).sort();
    let newArr = []
    let newObj = {}
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
        newArr.push(newkey[i] + obj[newkey[i]]);
    }
    return newArr.join('')
}

function getSign(str) {
    return utility.md5(str + 'a48fbae608c44cf491b791a40c99bfc7')
}

function getLetvUrl (opt, cb) {
    return http.request(opt, (res) => {})
}

module.exports = {
    async index (ctx, next) {
        let content = {
            body: '乐视下载地址'
        }
        await ctx.render('./letv/letv', {
            title: 'ceshi',
            content
        })
    },
    async letvinfo (ctx, next) {
        let id = ctx.query.id
        if (!id) {
            ctx.body = {
                code: 0,
                msg: '缺少视频id.',
                data: {}
            }
            return false
        }
        let signObj = {
			user_unique: '7a05c02c26',
			timestamp: new Date().getTime(),
			api: API,
			format: 'json',
			video_id: id,
			ver: '2.0'
        }
        signObj.sign = getSign(objKeySort(signObj))

        let params = {
            user_unique: urlencode(signObj.user_unique),
			timestamp: Number(urlencode(signObj.timestamp)),
			api: urlencode(signObj.api),
			format: urlencode(signObj.format),
			video_id: Number(urlencode(signObj.video_id)),
            ver: urlencode(signObj.ver),
            sign: signObj.sign
        }
        console.log('....params:', params)
        params = qs.stringify(params)

        let opt = {
            hostname: 'api.letvcloud.com',
            port: 80,
            path: '/open.php?' + params,
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                "Accept": "application/json"
            }
        }
        http.request(opt, (res)=>{
            let resBody = ''
            res.setEncoding('utf-8')
            res.on('data',(chunk)=>{
                resBody += chunk
                console.log(resBody)
                ctx.body = {
                    code: 200,
                    msg: '成功2',
                    data: resBody
                }
            });
            res.on('end',()=>{
                let result = JSON.parse(resBody)
                console.log(result)
                ctx.body = {
                    code: 200,
                    msg: '成功',
                    data: result
                }
            });
            res.on('error', err => {
                ctx.body = {
                    code: 10000,
                    msg: '请求失败.',
                    data: []
                }
            });
            ctx.body = {
                success: true,
                data: resBody
            }
        }).end()
        // ctx.body = {
        //     code: 200,
        //     data: opt
        // }
    }
}