//可以解决异步的问题
const events = require('events');
//创建一个EventEmitter 对象

var EventEmitter = new events.EventEmitter();

//事件绑定  事件订阅  （广播）
EventEmitter.on('say', (data)=>{
    var data = data?data:''
    console.log('say事件被触发了: ' + data);
})  


EventEmitter.on('eat', (data) => {
    console.log('eat事件被触发了: ' + data);
})

//时间的触发  事件发布 
EventEmitter.emit("say");   //没有发布数据


//发布事件并传递数据
EventEmitter.emit('say','这是传递的数据哦')