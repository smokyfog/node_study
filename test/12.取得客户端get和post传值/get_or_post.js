const http = require('http');
const url = require("url");
const ejs = require("ejs");
const querystring = require('querystring');

//获取get和post的传参
var server = http.createServer(function(req, res){
    //当输入localhost:8000/login 请求登陆页面
    //当点击登录按钮 提交数据action 路径
    var pathname = url.parse(req.url).pathname;
    //获取客户端请求的方式
    var method = req.method.toLowerCase();
    if( pathname == '/login'){
        //请求登陆页页面
        ejs.renderFile('views/login.ejs', {
            msg: '闫强真帅',
        }, function(err, data) {
            res.end(data)
        })
    }else if( pathname === '/dologin' && method === 'get'){ //添加路由， 实现登陆功能
        //接收客户端请求的数据  get
        var query = url.parse(req.url,true).query
        var str = 'username is '+ query.username +'  pwd is ' + query.pwd
        res.end(str)
    }
    else if( pathname === '/dologin' && method === 'post'){ //添加路由， 实现登陆功能
        //接收客户端请求的数据  post
        //通过data事件 响应数据 
        var dataStr = '';
        req.on("data",(data)=>{
            dataStr += data
        });
        //通过end事件告诉服务器  数据接收完毕
        req.on("end", ()=>{
            var json = querystring.parse(dataStr)
            if(json.username == 'admin' && json.pwd == '123456'){
                res.write("<script>alert('登陆成功');location.href='/home'</script>")
                res.end();
            }
        })
        res.end("真帅")
    }

}).listen(8000,()=>{console.log("listen 8000...")})