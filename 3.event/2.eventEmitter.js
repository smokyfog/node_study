//node 提供的事件监听 发布--订阅

//等同于1.event里面的方法

var EventEmitter = require("events");
var util = require("util")

function Bell(name){
    this.name = name;
}
util.inherits(Bell,EventEmitter);
var jingleBell = new Bell("jingle");
jingleBell.on('ring',function(){
    console.log('收到礼物一')
})

jingleBell.addListener('ring',function(){
    console.log('收到礼物二')
})

// jingleBell.once('drop',function(){
//     console.log('铃铛丢了')
// })
//移除全部监听
// jingleBell.removeAllListeners('ring');

var drop = function(who){
    console.log(who,'铃铛丢了')
}
jingleBell.once('drop',drop)

jingleBell.emit("ring");
//取消监听
// jingleBell.removeListener('drop',drop)
jingleBell.emit("drop",'小鹿')
jingleBell.emit('drop','老人')


console.log(jingleBell.listeners('ring'))