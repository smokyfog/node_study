const express = require("express");
var app = express();

//引入session
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name:   "sessionname",
    cookie: { maxAge : 1000000},
    rolling:true,
    store: new MongoStore({
        url: 'mongodb://118.24.113.209:27017/dbyq',
        touchAfter: 24 * 3600 //通过这样做，设置touchAfter:24 * 3600,您在24小时内
        //只更新一次会话，不管有多少请求（除了在绘画数据上更改某些内容的除外）
    })
}))

app.get('/login', (req, res) => {
    req.session.userinfo = 'yanqiang',
    res.send('登陆成功')
})


app.get("/",(req, res) => {
    if( req.session.userinfo ){
        res.send("欢迎" + req.session.userinfo+ '回来')
    }else{
        res.send("您还没有登陆")
    }
})

app.listen(8000, () => {
    console.log('listen 8000...')
})