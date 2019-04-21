// function x(){
//     var name = 'zqzs'
//     exports.name = name
//     console.log(this)
// }               
// x()


//等同于console.log("hello")
process.stdout.write("hello");


//打印进程id
console.log(process.pid)



//监听输入
process.stdin.on('data',function(data){
    console.log(data.toString())
})


// process.argv.forEach(function(val,index,array){
//     console.log(val , index ,array)
// })


//进程退出前的事件
process.on('exit',function(){
    console.log("死了")
})



//推出本进程
// process.exit(code=0)


//捕获异常1
// try{
//     console.log(a)
// }catch(e){
//     console.log(e.message)
// }



//捕获异常2  放在最上面捕获下面的所有异常  --不推荐   
// process.on("uncaughtException",function(e){
//     console.log("uncaughtException",e.message)
// })
// console.log(b)






