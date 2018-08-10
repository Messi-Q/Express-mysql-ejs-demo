var mysql = require('mysql')

function Optpool() {
    this.flag = true
    this.pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'test',
        port: '3306'
    })

    this.getPool = function () {
        if (this.flag) {
            this.pool.on('connection', function (connection) {
                connection.query('select session auto_increment')
                this.flag = false
            })
        }
        return this.pool
    }
}

module.exports = Optpool