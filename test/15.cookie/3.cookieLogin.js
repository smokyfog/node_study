const express = require("express");
const app = express();

var cookieParser = require("cookie-parser");
var bodyPaser = require("body-parser")

//配置bodyParser中间件 (内置中间件);
app.use(bodyPaser.urlencoded({ extended: false}));
app.use(bodyPaser.json());
app.use(cookieParser)

//配置ejs模板引擎
app.set("view engine", "ejs");

//设置中间件
app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/registerDo", (req, res) => {
    //接受表单的数据
    //存cookie
    var query = req.body; //{"username":xxx,"pwd":xxx}
    res.cookie("username",query.username);
    res.cookie('pwd',query.pwd);
    //跳转到登陆页面
    res.redirect("/login");
})

app.get("/login",(req, res) => {
    res.render("login")
})

app.post("/loginDo",function(req, res){
    //获取用户名和密码
	var query = req.body;
	//取出cookie中的用户名和密码
	var cname = req.cookies.username;
	var cpwd = req.cookies.password;
	if( query.username == cname && query.password == cpwd ){
		res.send("登录成功");
	}else{
		res.send("登录失败");
	}
})

app.listen(8000,()=>{
    console.log("listen 8000...")
})