var optfile = require("./operateFile.js")
var url = require('url')
var querystring = require('querystring')

function getRecall(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

    function recall(data) {
        res.write(data)
        res.end('')
    }

    return recall
}

module.exports = {
    login: function (req, res) {
        //get 方式接收参数
        // var data = url.parse(req.url, true).query
        // console.log(data)
        // if (data['email'] != undefined) {
        //     console.log(data['email'])
        //     console.log(data['pwd'])
        // }

        //post 方式接收参数
        var post = ''
        req.on('data', function (chunk) {
            post += chunk
        })
        req.on('end', function () {
            post = querystring.parse(post)
            //console.log('email:' + post['email'] + '\n')
            //console.log('pwd:' + post['pwd'] + '\n')
            arr = ['email', 'pwd']

            function recall(data) {
                dataStr = data.toString()
                for (var i = 0; i < dataStr.length; i++) {
                    re = new RegExp('{' + arr[i] + '}', 'g')
                    dataStr = dataStr.replace(re, post[arr[i]])
                }
                res.write(dataStr)
                res.end('')
            }
            optfile.readfile('./views/login.html', recall)
        })

        // recall = getRecall(req, res)
    },
    register: function (req, res) {
        recall = getRecall(req, res)
        optfile.readfile('./views/register.html', recall)
    },
    writefile: function (req, res) {
        recall = getRecall(req, res)
        optfile.writefile('./views/one.txt', '我的内容', recall)
    },
    showimg: function (req, res) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        optfile.readImage('./imgs/messi.jpg', res)
    }
}