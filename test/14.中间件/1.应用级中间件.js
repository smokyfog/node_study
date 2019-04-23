var express = require('express');
var app = express();



//消息相应之前时使用的中间件为应用级中间件
//当请求根路径的时候，为根路径的请求添加了一个应用级中间件
app.use('/', (req, res, next) => {
    console.log("相应根路径请求的中间件")
    next()
})

app.get("/", (req, res) => {
    res.send("主页面")
})


app.use("/news", (req, res, next) => {
    console.log("news中间件执行")
})
app.get("/news", (req, res) => {
    res.send("news路由")
})

app.listen(8000, () => {
    console.log('listen 8000...')
})