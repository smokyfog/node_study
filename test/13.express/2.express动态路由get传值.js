var express = require("express");
var app = new express();

//配置路由  访问根目录
app.get('/', function(req, res){
    res.send("主页")
})

app.get('/login',(req, res) => {
    res.send("登陆")
})

//配置动态路由 localhost:8000/news/788
app.get('/news/:pid/:aid',function(req, res){
    //获取动态路由  req.params
    console.log(req.params);
    //获取动态路由的pid和aid
    console.log(req.params.pid);
    res.send('news');
})

//获取get传值   localhost:8000/news?pid=99
app.get("/news", (req, res)=>{
    //获取get方式的传值
    console.log(req.query);
    res.send("news");
})

app.listen('8000',()=>{
    console.log("listen 8000...")
})