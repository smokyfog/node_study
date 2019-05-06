const express = require('express');
const app = express();
const db = require("./public/3.封装连接数据库");
const bodyParser = require("body-parser");
const session = require("express-session");
const md5 = require("md5-node");//密码md5加密
const multiparty = require("multiparty");//接受表单post提交的数据，并实现上传图片
const fs = require("fs");


app.set("view engine", "ejs")
app.use( express.static("public") );
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    name: "sessionname",
    cookie: {maxAge : 60*1000*20},
    rolling: true
}))



 
//注册
app.get("/register", (req, res) => {
    res.render("register");
})

//注册功能实现
app.post("/registerDo", (req, res) => {
    var query = req.body;
    var username = query.username;
    var password = md5(query.password); //对密码进行加密
    db.fnFind("user", {username: username}, (err, data) => {
        if(data.length == 0){
            //将得到的用户名和密码存入数据库中
            db.fnInsert("user", {"username":username,"password":password}, (err, data) => {
                if(!err){
                    // res.redirect("/login")
                    res.send(`<script> 
                        alert("注册成功！");location.href = "/login";
                    </script>`)
                }
            })
        }else{
            res.send(`<script> 
                        alert("用户名已存在，请重新输入");location.href = "/register";
                    </script>`)
        }
    })
    
})

 //自定义一个中间件，判断是否有session 如果有就next
 app.use( (req, res, next) => {
    //判断请求的路由是否为登陆 或者loginDo
    if(req.url === '/login' || req.url === '/loginDo'){
        next()
    }else{
       if(req.session.userinfo){
           next()
       }else{
           res.redirect("/login")
       }
    }
})


//登陆
app.get("/login", (req, res) => {
    res.render("login");
})

//登录功能实现
app.post("/loginDo", (req, res) => {
    var query = req.body;
    var username = query.username;
    var password = md5(query.password); //对密码进行加密
    db.fnFind("user", {"username":username,"password":password}, (err, data) => {
        if(err) return;
        if(data.length > 0){
            req.session.userinfo = query.username;
            //设置全局的session 是每个页面都可以访问到
            app.locals["username"] = req.session.userinfo
            res.send(`<script> 
                alert("登陆成功！");location.href = "/product";
            </script>`)
        }else{
            res.send(`<script> 
                alert("登陆失败！");location.href = "/login";
            </script>`)
        }
    })
})


//商品列表
app.get("/product", (req, res) => {
    db.fnFind("product", {}, (err, data) => {
        res.render("product", {
            list : data
        });
    })
})

//商品添加
app.get("/productadd", (req, res) => {
    res.render("productadd");
})
//配置一个静态目录，获取upload   并且配置一个虚拟路由
app.use("/upload",express.static("upload"))
//添加功能实现
app.post("/productAddDo", (req, res) => {
    var form = new multiparty.Form();
    form.uploadDir = "upload";
    form.parse(req, (err, data, files) => {
        var title = data.title[0];
        var price = data.title[0];
        var fee = data.fee[0];
        var description = data.description[0];
        var pic = files.pic[0].path;
        db.fnInsert( "product", {
            title,
            price,
            fee,
            description,
            pic
        }, (err, data) => {
            if(!err) {
                res.redirect("/product")
            } 
        }) 
    })
})

//商品编辑
app.get("/productedit", (req, res) => {
    //接受要修改的商品编号
    var id = req.query.id;
    //根据id查找商品的其他数据
    db.fnFind("product", {_id: new db.ObjectID(id)}, (err, data) => {
        
        res.render("productedit",{
            list : data[0]
        });
    })
})

 
//编辑商品
app.post("/producteditDo", (req, res) => {
    var form = new multiparty.Form();
    form.uploadDir = "upload";
    form.parse(req, (err, data, files) => {
        var id = data.id[0];
        var title = data.title[0];
        var price = data.price[0];
        var fee = data.fee[0];
        var description = data.description[0];
        var pic = files.pic[0].path;
        var originalFilename = files.pic[0].originalFilename;
        var updateJson = {};
        if(originalFilename){
            updateJson = {
                title,
                price,
                fee,
                description,
                pic
            }
        }else{
            updateJson = {
                title,
                price,
                fee,
                description
            }
            fs.unlink(pic);
        }
        db.fnUpdate("product", {"_id" : new db.ObjectID(id)} , updateJson, (err, data) => {
            if(!err){
                res.redirect("/product")
            }
        })
    })
})

//删除功能
app.get("/productdelete", (req, res) => {
    //接受要删除的商品编号
    var id = req.query.id;
    console.log(id)
    db.fnFind("product", {"_id":new db.ObjectID(id)}, (err, data) => {
        console.log(data)
    })
    db.fnDelete("product", {"_id" : new db.ObjectID(id)}, (err, data) => {
        if(!err){
            res.redirect("/product");
        }
    })
})

//搜索功能
app.post("/search", (req, res) => {
    var title = req.body.title;
    title =eval("/"+title+"/");
    db.fnFind("product", {"title":title}, (err, data) => {
        res.render("product", {
            list: data
        })
    })
})



app.listen(8000, () => {
    console.log("listen 8000...")
})