var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var chatServer = require("./lib/chat_server");

var cache = {};   //cache是用来缓存文件内容的对象

function send404(res){
    res.writeHead(404,{'Content-Type': 'text/plain'});
    res.write('Error 404 : resource not found !');
    res.end();
}

function sendFile(res,filePath,fileContents) {
    res.writeHead(
        200,
        {"content-type":mime.lookup(path.basename(filePath))}
    );
    res.end(fileContents)
}

function serveStatic(response, cache, absPath) {            //检查文件是否缓存在内存中
    if(cache[absPath]) {    
        sendFile(response, absPath, cache[absPath]);        //从内存中返回文件
    } else {    
        fs.exists(absPath, function(exists) {               //检查文件是否存在
            if (exists){
                fs.readFile(absPath, function(err,data) {   //从磁盘中读取出来
                    if(err) {
                        send404(response)
                    }else{
                        cache[absPath] = data;
                        sendFile(response, absPath, data)   //从磁盘读取文件并返回
                    }
                });
            }else{
                send404(response)                           //发送http 404响应
            }
        })
    }
}


var server = http.createServer(function(req,res){
    var filePath = false;

    if (req.url == '/') {
        filePath = 'public/index.html';             //确定返回的默认HTML文件
    }else{
        filePath = 'public' + req.url;              //将url路径转为静态文件路径
    }
    var absPath = './' + filePath;
    serveStatic(res, cache, absPath)               //返回静态文件
})


server.listen(3000,function(){
    console.log("Server listening on port 3000...")
})

chatServer.listen(server);
