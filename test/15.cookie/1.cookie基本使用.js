var express = require('express');
var app = express();

var cookieParser = require("cookie-parser");

//设置中间件

app.use( cookieParser() );

//配置路由，实现cookie的存储
app.get("/set", (req, res) => {
    res.cookie("userinfo","yanqiang");
    res.send("cookie设置成功");
})

app.get("/login", (req, res) => {
    //访问该路由时，获取cookie的信息
    console.log(req.cookies.userinfo)
    res.send("成功的获取了cookie")
    
})

app.listen(8000, () => {
    console.log("listen 8000...")
})