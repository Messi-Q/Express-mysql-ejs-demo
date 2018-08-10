var fs = require("fs")

module.exports = {
    readfilesync: function (path) {
        var data = fs.readFileSync(path, 'utf-8')
        console.log(data)
        console.log("同步读取文件完成")
    },
    readfile: function (path, recall) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err)
                recall('文件不存在')  //异步的异常处理
            } else {
                console.log('读文件成功')
                recall(data)
            }
        })
        console.log("异步读取文件完成")
    },
    writefile:function (path ,data, recall) {
        fs.writeFile(path, data, function (err) {
            if (err) {
                throw err
            }
            console.log('It is saved')
            recall('写文件成功')
        })
    },
    writefilesync:function () {
        
    },
    readImage:function (path, res) {
        fs.readFile(path, 'binary', function (err, filedata) {
                if (err) {
                    console.log(err)
                    return
                } else {
                    res.write(filedata, 'binary')
                    res.end('')
                }
        })
    }
}