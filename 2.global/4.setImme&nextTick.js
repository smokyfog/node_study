var fs = require("fs")
fs.readFile('1.txt',function(err,data){
    console.log(data.toString())
})

process.nextTick(function(){
    console.log('a')
    process.nextTick(function(){
        console.log('b')
    })
})

setTimeout(function(){
    console.log("timeout")
},0)

setImmediate(function(){
    console.log('aa')
    setImmediate(function(){
        console.log('bb')
    })
})