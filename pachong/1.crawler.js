var fs = require('fs');
var cheerio = require('cheerio')
var request = require('request');

// request.get('https://juejin.im/',(error, res, body)=>{
//     if(res.statusCode == 200){
//         console.log(body)        
//     }
// })

// request({
//   url:    'http://cnodejs.org/',   // 请求的URL
//   method: 'GET',                   // 请求方法
//   headers: {                       // 指定请求头
//     'Accept-Language': 'zh-CN,zh;q=0.8',         // 指定 Accept-Language
//     'Cookie': '__utma=4454.11221.455353.21.143;' // 指定 Cookie
//   }
// }, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // 输出网页内容
//   }
// });

// // 通过 load 方法把 HTML 代码转换成一个 jQuery 对象
// var $ = cheerio.load('<h2 class="title">Hello world</h2>');

// // 可以使用与 jQuery 一样的语法来操作
// $('h2.title').text('Hello there!');
// $('h2').addClass('welcome');

// console.log($.html());
// // 将输出 <h2 class="title welcome">Hello there!</h2>


