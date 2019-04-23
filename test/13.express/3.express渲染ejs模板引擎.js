var express = require("express");
//不用引入ejs 只安装就可以
// var ejs = require('ejs');
//配置express的模板引擎
//app.set("view engine", "ejs") 
//使用ejs模板引擎  render("url",{  })

var app = new express();
//要求模板引擎的的路径就是views
app.set("view engine", "ejs");
//改变模板引擎的默认路径
// app.set("view",__dirname+'/static')

//express渲染ejs模板引擎，导入静态文件配置
app.use(express.static('public'))



app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render('login',  {
        msg: "后台数据"
    })
})


app.listen(8000,()=>{
    console.log("listening 8000..")
})