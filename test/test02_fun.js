var http = require("http");
var otherfun = require("./models/otherfun.js")
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    if (request.url !== "/favicon.ico") {
        // fun1(response)
        otherfun.fun2(response)
        otherfun.fun3(response)
        response.end('')
    }
}).listen(8000)
console.log('server sunning at http://127.0.0.1:8000/')

function fun1(res) {
    console.log("fun1")
    res.write("hello, 我是fun1")
}
