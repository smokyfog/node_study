var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");

//定义爬取网站
var Url = 'http://sc.chinaz.com/tupian/';
http.get(Url, (res) => {
    var htmlData = '';
    //获取页面数据
    res.on('data', (chunk) => {
        htmlData += chunk;
    })
    //数据获取结束
    res.on("end", () => {
        //过滤所需的元素
        filterContent(htmlData);
    })
}).on('error', function () {
    console.log('获取数据出错！');
});

//过滤页面信息
function filterContent(htmlData){
    if(htmlData) {
        var $ = cheerio.load(htmlData);
        //获得所需要的内容
        var Content = $("#container");
        //存放一会抓来的数据
        var ContentData = [];
        console.log(Content)
        Content.find(".box").each(function(item,b){
            var pic = $(this);
            // 为什么是src2?  src获取不到 打印了一下发现有src2
            var src = formatUrl(pic.find('a').children('img').attr('src2'));
            var name = formatUrl(pic.find('a').children('img').attr('alt'));
            // 把抓来的信息交给download函数去下载
            download(src, name) 
            ContentData.push({
                src,
                name
            })
        })
        console.log(ContentData)
    }else{
        console.log('html null');
    }
}


// 或取高清链接
function formatUrl(imgUrl) {
    return imgUrl.replace('_s', '')
}


// 图片下载函数
function download(url, name) {
    http.get(url, function (res) {
      let imgData = '';
      //设置图片编码格式
      res.setEncoding("binary");
      //检测请求的数据
      res.on('data', (chunk) => {
        imgData += chunk;
      })
      res.on('end', () => {
          // 没有文件夹则创建 以防报错
        if (!fs.existsSync('./images')) {
          fs.mkdirSync('./images');
        };
        fs.writeFile(`./images/${name}.jpg`, imgData, 'binary', (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`${name}----下载成功！`)
          }
        })
      })
    })
  }
