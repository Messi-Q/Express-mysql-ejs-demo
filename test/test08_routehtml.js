var http = require("http");
var url = require("url")
var router = require("./models/router")
http.createServer(function (request, response) {
    // response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    response.writeHead(200, {'Content-Type': 'image/jpeg'})
    if (request.url !== "/favicon.ico") {
        var pathname = url.parse(request.url).pathname
        pathname = pathname.replace(/\//,'')
        router[pathname](request,response);
    }
}).listen(8000)
console.log('server sunning at http://127.0.0.1:8000/')