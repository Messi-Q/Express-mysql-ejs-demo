//数据库操作封装
var mysql = require('mysql');//引入mysql模块
var databaseConfig = require('./mysql.config');  //引入数据库配置模块中的数据


//向外暴露接口方法
module.exports = {
    query: function (sql, params, callback) {
        //每次使用的时候需要创建链接,数据操作完成之后要关闭连接
        var connection = mysql.createConnection(databaseConfig);
        connection.connect(function (err) {
            if (err) {
                console.log('数据库链接失败');
                throw err
            }
            console.log('数据库连接成功' + connection.threadId)
        });
        //数据操作,第一个参数sql语句,第二个参数sql语句中需要的数据,第三个参数回调函数
        connection.query(sql, params, function (err, results, fields) {
            if (err) {
                console.log('数据操作失败');
                throw err
            }
            console.log('数据操作成功')
            //将查询出来的数据返回给回调函数
            callback && callback(err, results, fields);
            //results作为数据操作后的结果,fields作为数据库连接的一些字段
            //停止链接数据库，
            connection.end(function (err) {
                if (err) {
                    console.log('关闭数据库失败');
                    throw err
                }
                console.log('数据库连接关闭')
            });
        });
    }
};



