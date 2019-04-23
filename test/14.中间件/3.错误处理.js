var express = require("express");
var app = express();


app.get("/", (req, res) => {
    res.send("主页面")
})


app.get("/news", (req, res) => {
    res.send("news路由")
})

//错误处理中间件
app.use((req, res) => {
    res.status(404).send("这个路由不存在")
})

app.listen(8000, () => {
    console.log('listen 8000...')
})