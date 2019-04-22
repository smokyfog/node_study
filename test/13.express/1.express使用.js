var express = require("express");
var app = new express();

//配置路由  访问根目录
app.get('/', function(req, res){
    res.send("主页")
})

app.get('/login',(req, res) => {
    res.send("登陆")
})

app.listen('8000',()=>{
    console.log("listen 8000...")
})