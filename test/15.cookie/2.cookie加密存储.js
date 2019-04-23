var express = require("express");
var app = express();

var cookieParser = require("cookie-parser");

//设置中间件

app.use( cookieParser("asb") );

//配置路由，实现cookie的存储
app.get("/set", (req, res) => {
    res.cookie("userinfo", "yanqiang", {maxAge:1000*60*3,signed:true});
    res.cookie("pwd", "yanqiang", {maxAge:1000*60*3,signed:true});
    res.send("cookie设置成功");
})

app.get("/login", (req, res) => {
    //访问该路由时，获取cookie的信息
    //获取不加密的
    console.log(req.cookies.userinfo)
    //解析加密的
    console.log(req.signedCookies.userinfo) 
    res.send("成功的获取了cookie")
    
})

app.listen(8000, () => {
    console.log("listen 8000...")
})