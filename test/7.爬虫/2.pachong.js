var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio')

http.get('http://news.baidu.com/',(res)=>{
    if(res.statusCode == 200){
        console.log('ok')
        var str = '';
        //http协议 以文件流的方实读取数据的 不会一次性的拿到所有的数据
        //需要将每次拿到的数据进行拼接
        res.on('data',(data)=>{
            str += data;
        })
        //当data事件相应完成后 会自动触发end事件 结束数据读取
        res.on('end',()=>{
            //str 代表整个html的数据
            // console.log(str)
            //使用cheerio 模块将从服务器上抓取的html数据转成 cheerio对象
            var $ = cheerio.load(str,{decodeEntities:false});   //编码
            var list = $(".ulist");
            var dataStr = list.eq(0).find('li').find("a").html()
            console.log(dataStr)
            fs.writeFileSync("news.txt", dataStr)
        })
    }
})