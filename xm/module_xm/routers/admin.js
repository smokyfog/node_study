var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../moduls/3.封装连接数据库");
var md5 = require("md5-node");

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

//使用router配置子路由  admin模块下的路由

router.get("/", (req, res) => {
    res.render("admin/admin.ejs")
})

router.get("/login", (req, res) => {
    res.render("admin/login.ejs")
})

router.post("/loginDo", (req, res) => {
    var query = req.body;
    var username = query.username;
    var password = md5(query.password); 
    db.fnFind("user", {username,password}, (err, data) => {
        if(data.length){
            res.redirect("/product")
        }else{
            res.send(`<script>
            alert("登录失败");
            location.href="/admin/login"
            </script>`)
        }
    })
})
 
router.get("/register", (req, res) => {
    res.send("admin register")
})


module.exports = router;