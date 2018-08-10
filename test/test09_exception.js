var http = require("http");
var url = require("url")
var router = require("./models/router")
var exception = require("./models/exceptions")
http.createServer(function (request, response) {
    if (request.url !== "/favicon.ico") {
        pathname = url.parse(request.url).pathname
        pathname = pathname.replace(/\//, '')
        try {
            // router[pathname](request, response)
            data = exception.expfun(10)
            response.write(data)
            response.end('')
        } catch (err) {  //同步异常处理
            console.log('错误：' + err)
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            response.write(err.toString())
            response.end('')
        }
        console.log('执行完毕')
    }
}).listen(8000)
console.log('server sunning at http://127.0.0.1:8000/')