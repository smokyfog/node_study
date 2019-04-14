var http = require("http")
var fs = require("fs")
var mime = require("mime")
var url = require("url")//对url进行处理，把字符串转成对象
// console.log(mime)

function serve (req,res) {
    //req 请求
    //res 相应
    // console.log(req.method)//请求的方法
    // console.log(req.url)//请求里的url
    // console.log(req.headers)//获取请求头
    var urlObj = url.parse(req.url,true)

    var pathname = urlObj.pathname
    if(pathname == '/'){
        req.statusCode = 200;//设置响应码
        //设置相应的类型
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.setHeader("name","wssg")//设置响应头
        //读取文件的内容并发独读到的内容写入响应体
        fs.readFile('index.html',function(err,data){
            res.write(data);//写入方法
            res.end()//
        })
    }else if (pathname == '/clock'){
        var counter = 0
        var timer = setInterval(()=>{
            res.write(new Date().toString());
            counter ++;
            if(counter == 5){
                clearInterval(timer);
                res.end()
            }
        },1000)
    }else{
        static(pathname,res)
    }
    function static (pathname,res) {
        console.log(mime.lookup(pathname)+';charset=utf-8')
        res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
        fs.readFile(pathname.slice(1),function(err,data){
            res.write(data);//写入方法
            res.end()//
        })
    }
    
    
}
//每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080,'localhost')