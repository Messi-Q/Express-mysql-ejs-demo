var optpool = require('./models/optpool')
var optPool = new optpool()
var pool = optPool.getPool()

pool.getConnection(function (err, conn) {
    var sql = 'insert into user (uname, pwd) values(?,?)'
    var param = ['ccc', 'ccc']
    conn.query(sql, param, function (err, rs) {  //插入回调function
        if (err) {
            console.log('insert err:', err.message)
            return
        }
        console.log('insert success')
    });

    //查询
    sql = 'select * from user where uid = ?'
    conn.query(sql, [2], function (err, rs, fields) {
        if (err) {
            console.log('[query] - :' + err)
            return
        }
        for (var i = 0; i < rs.length; i++) {
            console.log('The username is:', rs[i].uname)
        }
    });

    conn.release()
});
