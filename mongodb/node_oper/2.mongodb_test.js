var express = require("express");
var app = express();
//引入mongodb模块
var mongodb = require("mongodb");
//使用MongoClient 连接mongodb
var MongoClient = mongodb.MongoClient;

//连接数据库    并实现查询功能
MongoClient.connect("mongodb://118.24.113.209:27017/dbyq",function(err, db){
    //err： 连接错误返回的对象  返回null 表示连接成功
    //db： 代表连接的数据库
    // console.log(err);
    //选择要操作的集合
    var user = db.collection('user');
    //查询功能
    // console.log(user.find()) 
    
    

    // yq.find({"age" : 18}).toArray(function(err, res){
    //     console.log(res)
    // })



    //插入数据
    // user.insert({"name":"张三","age":2,"sex":'女'},function(err, res){
    //     console.log(res)
    // })



    //更新数据
    //正常更新第一个为如果不存是否新增,第二个为是否修改多个
    // yq.update({"age":88},{$set : { 'sex': '女' } }, function(err, res){
    //     console.log(res)
    // })
    
    // yq.update({"age" : 18},{ $set : { 'sex': '男' } }, function(err, res){
    //     console.log(err)
    // })


    //修改数据
    // yq.remove({'name':'张三'}, function(err, res){
    //     console.log(res)
    // })


    //查询数据
    user.find().toArray(function(err, res){
        console.log(res)
    })


    //使用数据库之后，关闭数据库
    db.close()
})