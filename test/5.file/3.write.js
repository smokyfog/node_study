const fs = require("fs");

// fs.writeFileSync("path",'第一行',{flag:'w',encoding:'utf-8',function (err) {
//     console.log()
// }})

fs.writeFileSync("123.txt",'第一行',{flag:'w',encoding:'utf-8',function (err) {
    console.log()
}}) 

fs.writeFileSync("123.txt",new Buffer('第二行'),{flag:'w',encoding:'utf-8',function(err){
    console.log()
}})

fs.appendFileSync("123.txt",new Buffer('第二行'))