var fs = require("fs");
var content = fs.readFileSync("index.js");
//不指定字符编码的情况下
console.log(content);   // <Buffer 61 62 63>
