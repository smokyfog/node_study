const express = require("express");
const app = express();

const session = require("express-session");
app.use(session({
    secret : "keybord cat",
    resave : true,
    saveUninitialized : true,
    name:   "sessionname",
    cookie: { maxAge : 1000*60*20},
    rolling:true
}))

//配置路由
app.get('/login', (req, res) => {
    //存session数据
    req.session.username = "admin";
    res.send("存储成功数据为"+req.session.username);
})
app.get("/", (req, res) => {
    //取session数据
    if( req.session.username ){ //判断是否有session数据
        res.send("欢迎" +req.session.username + "进入我的网站");
    }else{
        res.send("未登录");
    }
})
//session的销毁
app.get('/loginOut', (req, res) => {
    // 第一种 使cookie过期  致使session无效
    // req.session.cookie.maxAge = 0; //session的销毁
    // 第二种 直接删除cookie
    req.session.destroy(() => {
        console.log("退出登陆")
    })
    res.send("销毁成功")
})




app.listen(8000, () => {
    console.log("listen 8000...")
})