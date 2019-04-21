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
    var str = req.url
    var pathname = urlObj.pathname
    console.log(urlObj.query);
    if(str !== "/favicon.ico"){
        //获取网址信息并解析
        var name = url.parse(str,true).query.name;
        if(pathname === '/'){
            var result = fs.readFileSync('./html/index.html',"utf-8")
            res.end(result)
        }else if (pathname === '/index'){
            var result = fs.readFileSync('./html/index.html',"utf-8")
            res.end(result)
        }else if (pathname === '/login'){
            //获取网址的信息并解析
            var result = fs.readFileSync('./html/login.html',"utf-8")
            result = result.replace(/{{name}}/, name || "what is your name ?");
            res.end(result)
        }else if(pathname === '/register'){
            var result = fs.readFileSync('./html/register.html',"utf-8")
            res.end(result)
        }else{
            var result = fs.readFileSync('./html/404.html',"utf-8")
            res.end(result)
        }
    }
    

    function static (pathname,res) {
        console.log(pathname)
        console.log(mime.lookup(pathname)+';charset=utf-8')
        res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
        fs.readFile("./html/" + pathname,function(err,data){
            // res.write();//写入方法
            res.end(data)
        })
    }
    
    
}
//每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080,()=>{
    console.log("listening 8080 ...")
})