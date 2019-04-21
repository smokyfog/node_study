
//三种构建buffer的方法
var buf1 = new Buffer(3);
buf1[0] = 0X61;
buf1[1] = 0X62;
buf1[2] = 0X63;
var buf2 = new Buffer([0X61,0X62,0X63])
var buf3 = new Buffer("abc",'utf-8')
console.log(buf1,buf2,buf3)



//buffer好和字符串的比较
var str = "闫强真帅";
var buf = new Buffer(str);
console.log(str.length);
console.log(buf.length);
console.log(buf.toString("utf8"));

str[0] = '天'
console.log(str)
buf[0] = 0;
console.log(buf)