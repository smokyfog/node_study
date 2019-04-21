
const http = require("http");
const fs = require('fs');
const url = require('url');

var server = http.createServer((req,res) => {
    var pname = req.url;
    if(pname == '/'){
        pname = '/index.html'
    }
    if( pname != '/favicon.ico'){
        //开始读取html目录下对应的文件内容
        fs.readFile('html' + pname, (err, data) => {
            res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
            res.write(data)
            res.end()
        })
    }else{
        res.end('403 ...')
    }
})

server.listen(8080,()=>{
    console.log("listening 8080...")
})

// 思路：
//获取页面访问的文件类型：关键是得到扩展名
// 如果扩展名为 .css    text/css
// 如果扩展名为 .html   text/html
// 如果拓展名为 .js     text/javascript