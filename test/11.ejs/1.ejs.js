var ejs = require("ejs");
var http = require("http");
var url = require("url")
//搭建一个服务器
var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    console.log(pathname)
    //路由判断
    if(pathname === "/home" ){
        var str = "<b>这是一条从数据库中读取的后台数据</b>"
        //使用ejs的renderFile方法渲染某个模板引擎
        //三个参数
        //1. strurl
        //2. { json数据 }
        //3. 回调
        ejs.renderFile('views/index.ejs', {
            msg: str,
            num: 20,
            list: ["高富帅","白富美","闫强"]
        }, function(err, data) {
            res.end(data)
        })
    }else if( pathname === "/login" ){
        ejs.renderFile('views/login.ejs', {}, function(err, data) {
            res.end(data)
        })
    }
}).listen(8000, function(){
    console.log("listen 8000...")
})