var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    port: '3306'
})

//连接
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err)
        return
    }
    console.log('[connection connect] succeed!')
})

//插入
var sql = 'insert into user (uname, pwd) values(?,?)'
var param = ['james', '54321']
connection.query(sql, param, function (err, rs) {  //插入回调function
    if (err) {
        console.log('insert err:', err.message)
        return
    }
    console.log('insert success')
})

//查询
sql = 'select * from user where uid = ?'
connection.query(sql, [2], function (err, rs, fields) {
    if (err) {
        console.log('[query] - :' + err)
        return
    }
    for (var i = 0; i < rs.length; i++) {
        console.log('The username is:', rs[i].uname)
    }
})

//关闭
connection.end(function (err) {
    if (err) {
        console.log(err.toString())
        return;
    }
    console.log('[connection end] succeed!')
})