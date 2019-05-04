var express = require("express");
var app = express();
//引入自定义的操作数据库模块
var db = require("./3.封装连接数据库")
//引入第三方中间件body-parser  接收post提交的数据
var bodyParser = require("body-parser"); 
//设置中间件
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

//设置ejs的模板引擎
app.set("view engine", "ejs");

//配置路由  列表显示功能

app.get("/show", (req, res) => {
    db.fnFind('stu', {}, (err, data) => {
        if(!err){
            res.render("showStuInfo",{
                list: data
            })
        }
    })
})


//添加视图
app.get("/add", (req, res) =>{
    res.render("stuAdd")
})

//添加功能实现
app.post("/addDo", (req, res) => {
    //获取表单提交的数据
    var query = req.body;
    var json = {
        "sname": query.sname,
         "age": query.age,
         "addr": query.addr,
         "tel": query.tel
    }
    db.fnInsert("stu", json, (err, data) => {
        if( !err ){
            res.send(`  <script>
                            alert("添加成功");
                            location.href = "/show" 
                        </script>`)
        }
    })

})

//删除功能的实现
app.get("/deleteDo", (req, res) => {
    var id = req.query.id;
    var json = { "_id" :  new db.ObjectID(id)};
    db.fnDelete("stu", json , (err, data) => {
        if(!err){
            res.redirect("/show")
        }
    })
})


//弹出修改视图
app.get("/update", (req, res) => {
    var json = { "_id": new db.ObjectID(req.query.id)}
    db.fnFind('stu', json, (err, data) => {
        res.render("stuupdate", {
            list : data[0]
        })
    })
})

app.post("/modify", (req, res) => {
    var query = req.body;
    var id = req.query.id;
    var json1 = {_id: new db.ObjectID(id) };
    var json2 = {   name:query.sname,
                    age:query.age,
                    addr:query.addr,
                    tel:query.tel
                }
    db.fnUpdate("stu", json1, json2, (err, data) => {
        if(!err){
            //直接跳转到主页面上
            res.send(`  <script>
                            alert("修改成功");
                            location.href = "/show" 
                        </script>`)
        }
    })
})


app.listen(8000, () => {
    console.log("listen 8000....")
}) 