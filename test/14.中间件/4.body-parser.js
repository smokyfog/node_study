var expree = require("express");
var app = expree();
//引入body-parser模块
var bodyParser = require("body-parser");

//配置body-parser 中间件  (内置中间件)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//配置ejs模板引擎
app.set("view engine", "ejs");

//配置登陆页面路由
app.get("/login", (req, res) => {
    res.render("login")
})

//使用post方式接受客户端的数据
app.post("/dologin", (req, res) => {
    //接受post方式
    console.log(req.body);
    if(req.body.username == "admin" && req.body.pwd == "123456"){
        res.send("登陆成功");
    }else{
        res.send("登陆失败");
    }
})


app.listen(8000, () => {
    console.log("listening 8000...")
})