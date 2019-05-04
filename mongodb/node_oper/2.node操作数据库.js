//先设计一个数据库   并添加一个集合
//需要安装一个模块 express   ejs   body-parser mongodb

// 一.列表的显示
// 1.确定显示的路由118.24.113.209:27017/study


var express = require("express");
var app = express();
//引入第三方中间件body-parser  接收post提交的数据
var bodyParser = require("body-parser"); 
//设置中间件
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

//引入mongodb模块
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;//为了识别id 数据
var DbUrl = "mongodb://118.24.113.209:27017/study"

//设置ejs的模板引擎
app.set("view engine", "ejs");

//配置路由  列表显示功能

app.get("/show", (req, res) => {
    //连接数据库
    MongoClient.connect(DbUrl, (err, db) => {
        if(err){
            console.log("数据库连接失败")
            return;
        }
        //确定要操作的集合
        var collection = db.collection("stu");
        //查询集合的数据
        collection.find().toArray(function(err, data) {
            // console.log(data)
            if(!err){
                res.render("showStuInfo",{
                    list: data
                })
            }
        })
        db.close();
    })
    // res.render("showStuInfo")
})


//添加视图
app.get("/add", (req, res) =>{
    res.render("stuAdd")
})

//添加功能实现
app.post("/addDo", (req, res) => {
    //获取表单提交的数据
    // var str = '';
    // req.on("data", (data) => {
    //     str += data
    // })
    // req.on("end", () => {
    //     console.log(str)
    // })
    console.log( req.body )
    var query = req.body;
    var json = {
        "sname": query.sname,
         "age": query.age,
         "addr": query.addr,
         "tel": query.tel
    }
    MongoClient.connect(DbUrl, (err, db) => {
        var collection = db.collection("stu");
        //实验添加功能
        collection.insert( json , (err, data) => {
            if(!err){
                //直接跳转到主页面上
                res.send(`  <script>
                                alert("添加成功");
                                location.href = "/show" 
                            </script>`)
                // res.redirect("/show")
            }
        })
    })

})

//删除功能的实现
app.get("/deleteDo", (req, res) => {
    console.log( req.query )
    //接受要删除的学生编号
    var id = req.query.id;
    //操作数据库完成删除功能
    MongoClient.connect(DbUrl, (err, db) => {
        if(err){
            console.log("数据库连接失败")
            return;
        }
        //确定操作的集合
        var collection = db.collection("stu");
        collection.remove({ "_id" :  new ObjectID(id)}, (err, data) => {
            if(!err){
                //删除成功
                res.redirect("/show")
            }
        })

        db.close();
    })
})


//弹出修改视图
app.get("/update", (req, res) => {
    //接受编号
    var query = req.query;
    //操作数据库
    MongoClient.connect(DbUrl, (err, db) => {
        if(err){
            console.log("数据库连接失败")
            return;
        }
        var collection = db.collection("stu");
        collection.find({ "_id": new ObjectID(query.id)}).toArray((err, data) => {
            // console.log(data[0])
            res.render("stuupdate", {
                list : data[0]
            })
        })
        db.close()

    })
})

app.post("/modify", (req, res) => {
    var query = req.body;
    var id = req.query.id;
    console.log(query)

    MongoClient.connect(DbUrl, (err, db) => {
        if(err){
            console.log("数据库连接失败")
            return;
        }
        var collection = db.collection('stu');
        console.log({
            name:query.sname,
            age:query.age,
            addr:query.addr
            ,tel:query.tel
        })
        collection.update(
            {_id: new ObjectID(id) } ,
            {
            $set:{
                name:query.sname,
                age:query.age,
                addr:query.addr
                ,tel:query.tel
            }}, (err, data) => {
                console.log(err)
                if(!err){
                    //直接跳转到主页面上
                    res.send(`  <script>
                                    alert("修改成功");
                                    location.href = "/show" 
                                </script>`)
                }
            })
    })
})


app.listen(8000, () => {
    console.log("listen 8000....")
}) 