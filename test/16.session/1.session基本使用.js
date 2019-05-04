/*
* 第一步    安装 npm i express-session --save
* 第二步    引入
* 第三部    设置中间件 
    app.use(session({
        secret: 'keybord cat',
        resave: true,
        saveUnintialized: true
    }))
* 第四步    使用session
*/
var express = require('express');
var app = express();
//引入session
var session = require('express-session');
//设置中间件
// app.use(session({
//     secret: 'keybord cat',
//     resave: true,
//     saveUnintialized: true
// }))

app.use(session({
    secret: 'keybord cat',//加密字符串  随便写
    name:"name",//生成session的key名  默认为connect.sid 可以不设置
    cookie: {maxAge:60*1000},//根据cookie设置过期时间 
    resave: true,//强制保存session 默认为true 建议设置为false
    saveUnintialized: true,//true : 强制未初始化的session 存储 默认为true。建议设置成true
                            //req.session 不给值  值为false 不设置， 值为false 就默认设置
                            //req.session 给值    值为false和true没什么区别
    rolling:true,//在每次请求时强行设置cookie，这将重置cookie 过期时间 （默认：false） 建议设置为true
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
        req.send("未登录");
    }
})
app.listen(8000, () => {
    console.log("listen 8000...")
})
