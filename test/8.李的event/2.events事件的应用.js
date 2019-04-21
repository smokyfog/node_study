const events = require('events');
const fs = require('fs');





//将readFile封装成一个方法

//第一种方式  通过回调函数 来输出文件内容
// function fnReadFile(callback){
//     fs.readFile('1.txt', function(err, data){
//         callback(data.toString())
//     })
// }

// fnReadFile(function(res){
//     console.log( res )
// })


//第二种方案  使用events事件  订阅事件
const EventEmitter = new events.EventEmitter()
EventEmitter.on("showData", function(data){
    console.log('开始发布数据：');
    console.log("发布的数据是：" + data);
})
//封装一个函数功能是读取1.txt的数据


function fnReadFile(){
    fs.readFile('1.txt', function(err, data){
        EventEmitter.emit("showData",data)
    })
}


fnReadFile()