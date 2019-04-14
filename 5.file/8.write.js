//fs.write 写文件

var fs = require('fs');
fs.open('123.txt','w',function(err,fd){
    fs.write(fd,new Buffer('闫强真帅'),6,6,0,function(err,bytewritten){
        console.log(bytewritten)
    })
})