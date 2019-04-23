var express = require("express");
var app = express();


app.get("/", (req, res) => {
    res.send("主页面")
})



//路由中间件
app.get("/news", (req, res, next) => {
    console.log("访问路由中间件")
    next()
})
app.get("/news", (req, res) => {
    res.send("news路由")
})



app.listen(8000, () => {
    console.log('listen 8000...')
})