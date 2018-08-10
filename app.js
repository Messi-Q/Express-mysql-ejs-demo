var createError = require('http-errors');
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var body = require('body-parser');
var logger = require('morgan');
var formidable = require('formidable');
var db = require('./model/DbUtils');
var fs = require('fs');
var crypto = require('crypto');

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'FileUpload')));
app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'model')));

//trim方法
function trimStr(str) {
    if (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

app.get('/', function (req, res) {
    //数据库查询数据传给首页
    var sql = 'select * from fileinfo';
    db.query(sql, function (err, rs, fields) {
        if (err) {
            console.log('查询失败');
            throw err
        }
        console.log('查询结果：');
        console.log(rs);

        res.render('index', {
            title: "资源网站A首页",
            data: rs
        });
        return;  //Can’t set headers after they are sent的解决方法
    });
});

app.get('/upload', function (req, res) {
    res.render('upload', {
        title: '资源上传',
        error: '文件描述需要大于10个字符小于100个字符'
    });
});

app.post('/file_upload', function (req, res, next) {
    //验证描述
    var cont = trimStr(req.body.fileDescription);
    if (cont == null || cont.length < 10 || cont.length > 100) {
        res.render('upload', {
            title: '资源上传',
            error: '文件描述需要大于10个字符小于100个字符'
        });
        return
    }
    //文件上传
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'FileUpload/'; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.multiples = true; //设置为多文件上传
    form.maxFieldsSize = 10 * 1024 * 1024; //文件大小10mb
    form.hash = 'md5';

    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('上传错误' + err.message);
            return;
        }
        console.log(files);
        console.log(fields);

        //资源概要图片的改名
        //旧的路径
        var oldpath1 = files.abstractPic.path;
        console.log(oldpath1);
        //新的路径
        var newpath1 = path.join(path.dirname(oldpath1), files.abstractPic.name);
        console.log(newpath1);
        //改名
        fs.rename(oldpath1, newpath1, function (err) {
            if (err) {
                console.log("改名失败");
            }
            console.log('概要图片上传并改名成功')
        });

        //文件资源的改名
        var oldpath2 = files.selectFile.path;
        //新的路径
        var newpath2 = path.join(path.dirname(oldpath2), files.selectFile.name);
        //改名
        fs.rename(oldpath2, newpath2, function (err) {
            if (err) {
                console.log("改名失败");
            }
            console.log('资源文件上传并改名成功')
        });

        //获取文件信息参数
        var fileTitle = fields.title;
        var fileImage = path.basename(newpath1);
        var fileReadPrice = fields.readPrice;
        var fileRightPrice = fields.rightPrice;
        var fileDescription = fields.fileDescription;
        var fileSelectFile = path.basename(newpath2);
        console.log(fileTitle, fileImage, fileReadPrice, fileRightPrice, fileDescription, fileSelectFile);

        //数据库操作
        //插入
        var sql1 = 'insert into fileinfo(fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice) values(?,?,?,?,?)';
        var params = [fileTitle, fileImage, fileDescription, fileReadPrice, fileRightPrice];
        db.query(sql1, params, function (err, rs, fields) {
            if (err) {
                console.log('添加失败');
                throw err
            }
            console.log('添加成功');
            // console.log(rs)
        });

        //查询
        var sql2 = 'select * from fileinfo';
        // var param = [fileTitle]
        db.query(sql2, function (err, rs, fields) {
            if (err) {
                console.log('查询失败');
                throw err
            }
            console.log('查询结果：');
            console.log(rs);

            res.render('index', {
                title: "资源网站A首页",
                data: rs
            });
            return;  //Can’t set headers after they are sent的解决方法
        });
    });
    console.log("文件上传成功");
});


app.get('/login', function (req, res) {
    res.render('login', {
        title: '登录',
        error: 'error'
    });
});

app.get('/regist', function (req, res) {
    res.render('regist', {
        title: '注册',
        error: 'error'
    });
});

app.post('/do_login', function (req, res) {
    var userEmail = req.body.userEmail;
    var md5 = crypto.createHash('md5');
    var userPwd = md5.update(req.body.userPwd).digest('hex');
    var sql = "select * from user where userEmail = '" + userEmail + "' and userPwd = '" + userPwd + "'";
    db.query(sql, function (err, rs) {
        if (err) {
            throw error;
            window.alert('邮箱或密码错误');
            return res.redirect('/login');
        }
        console.log('验证正确');
        res.redirect('/');
    });
});

//实现注册功能
app.post('/do_regist', function (req, res) {
    var userName = req.body.userName;
    var md5 = crypto.createHash('md5'), userPwd = md5.update(req.body.userPwd).digest('hex');
    var md5 = crypto.createHash('md5'), userRepwd = md5.update(req.body.userRepwd).digest('hex');
    var md5 = crypto.createHash('md5'), userEmail = md5.update(req.body.userEmail).digest('hex');
    var sql = 'insert into user(userName, userPwd, userRepwd, userEmail) values(?,?,?,?)';
    var param = [userName, userPwd, userRepwd, userEmail];
    db.query(sql, param, function (err, rs, fields) {
        if (err) throw err;
        console.log('注册成功');
        res.redirect('/');
    });
});

var server = app.listen(3000, "localhost", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例,访问地址为 http://%s:%s", host, port)
});
