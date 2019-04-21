var cheerio = require("cheerio");
//load 返回一个cheerio对象，（这个对象类似于jq对象，cheerio对象的dom操作方法和jq中的dom操作是一样的）
var $ = cheerio.load("<div class='box'></div>",{decodeEntities:false});
$(".box").html('向div中添加的内容');
console.log($(".box").html())