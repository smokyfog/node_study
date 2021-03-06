var http = require("http")
var fs = require("fs")
var mime = require("mime")

function serve (req,res) {
    //req 请求
    //res 相应
    console.log(req.method)//请求的方法
    console.log(req.url)//请求里的url
    // console.log(req.headers)//获取请求头
    var url = req.url;
    if(url == '/'){
        req.statusCode = 200;//设置响应码
        //设置相应的类型
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.setHeader("name","wssg")//设置响应头
        //读取文件的内容并发独读到的内容写入响应体
        fs.readFile('index.html',function(err,data){
            res.write(data);//写入方法
            res.end()//
        })
    }else{
        static(url,res)
    }
    
    function static (url,res) {
        res.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');
        fs.readFile(url.slice(1),function(err,data){
            res.write(data);//写入方法
            res.end()//
        })
    }
    
    
}
//每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080,'localhost')