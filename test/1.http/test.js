
//1.一个简单的web服务器
// var http = require('http');
// var server = http.createServer(function (req,res) {
//     res.writeHead(200);
//     res.end("hell world")
// });
// server.listen(80)

//单线程
// var start = Date.now();
// setTimeout(() => {
//     console.log(Date.now()-start)
//     for(var i = 0;i < 10000000000;i++){} 
// }, 1000);
// setTimeout(() => {
//     console.log(Date.now()-start)
// }, 2000);



// var http = require("http");
// function process_request(req,res) {
//     var body = 'Thanks for calling!\n';
//     var ccontent_length = body.length;
//     res.writeHead(200,{
//         'Content-Length': ccontent_length,
//         'Content-Type': 'text/plain'
//     });
//     res.end(body);
// }
// var s = http.createServer(process_request);
// s.listen(8080)


//global
// function printit(var_name) {
//     console.log(global[var_name]);
// }
// global.fish = "sworldfish";
// global.pet = "cat";

// printit("fish")
// printit("pet")



// var fs = require("fs");
// var file = new Buffer(100000);
// fs.open(
//     'info.txt', 'r',
//     function (handle) {
//         file = handle;
//     }
// );

// fs.read(
//     file, buf, 0, 100000, null,
//     function () {
//         console.log(buf.toString());
//         file.close(file, function () {})
//     }
// )