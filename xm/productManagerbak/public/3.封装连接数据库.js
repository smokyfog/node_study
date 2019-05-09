/* 封装连接数据库 */

// 1.引入mongodb模块
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;
//  将ObjectID暴露
exports.ObjectID = ObjectID;

//  2. 定义连接数据库的字符串
var DbUrl = "mongodb://118.24.113.209:27017/productManager"

//  3.定义一个函数  功能用来连接数据库
function connectDB(callback){
    MongoClient.connect( DbUrl , (err, db) => {
        if(err){
            console.log(err)
            console.log("数据库连接失败");
            return;
        }
        callback( db )
    })
}

// 增
// 第一个参数要操作的集合名称  
// 第二个参数 对集合添加的数据  
// 第三个参数 添加成功或
exports.fnInsert = (collectionName, json ,callback) => {
    connectDB((db) => {
        //完成添加功能
        var collection = db.collection(collectionName);
        collection.insert( json, (err, data) => {
            db.close()
            callback(err,data)
        })
    })
}

//删
exports.fnDelete = (collectionName, json, callback) => {
    connectDB( (db) => {
        var collection = db.collection(collectionName);
        collection.remove(json, (err, data) => {
            db.close()
            callback(err,data)
        })
    })
}

//改
exports.fnUpdate = (collectionName, json1, json2, callback) => {
    connectDB( (db) => {
        var collection = db.collection(collectionName);
        collection.update(json1, { $set : json2 }, (err, data) => {
            db.close()
            callback(err, data)
        } )
    })
}

//查
exports.fnFind = (collectionName, json, callback) => {
    connectDB((db) => {
        var collection = db.collection(collectionName);
        collection.find( json ).toArray( (err, data) => {
            db.close()
            callback( err, data );
        })
    })
} 