var fs = require("fs");
var list = [];
fs.open('123.txt','r',function(err,fd){
    function read() {
        var buffer = new Buffer(3);
        fs.read(fd,buffer,0,3,pos,function(err,bytesRead){
            list.push(buffer)
            pos+=bytesRead;
            if(bytesRead>0){
                read()
            }else{
                var result = Buffer.concat(list)
                console.log(result.toString())
            }
        })
    }
    read()
})