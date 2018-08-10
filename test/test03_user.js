var http = require("http");
var User = require("./models/users.js")
var Teacher = require("./models/teacher.js")
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    if (request.url !== "/favicon.ico") {
        // fun1(response)
        user =new User(1, "messi", 22)
        user.enter()
        teacher = new Teacher(1, "james", 34)
        teacher.teach(response)
        response.end('')
    }
}).listen(8000)
console.log('server sunning at http://127.0.0.1:8000/')