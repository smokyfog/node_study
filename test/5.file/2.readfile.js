//readfileSync 读取文件
const fs = require("fs");

//O_RDONLY  只读
//O_SYNC    同步
//O_RDWR    可读可写
//O_TRUNC truncate 清空文件
//O_CREAT   如果原来没有就创建   
//O_EXCL excludsive 排他操作
//O_APPEND  追加

//path 文件的路径
//options：
//encoding  文件的编码
//flag


var data = fs.readFileSync("index.txt",{encoding:'utf-8',flag:'wr'})


fs.readFile("idnex.txt",{encoding:'utf-8',flag:'w'},function(err,data){
    if(err){
        console.log(err)
    }
})

