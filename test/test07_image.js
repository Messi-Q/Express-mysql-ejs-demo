var http = require("http")
var optfile = require("./models/operateFile")
http.createServer(function (request, response) {
    // response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    response.writeHead(200, {'Content-Type': 'image/jpeg'})
    if (request.url !== "/favicon.ico") {
        optfile.readImage('./imgs/messi.jpg', response)
    }
}).listen(8000)
console.log('server sunning at http://127.0.0.1:8000/')