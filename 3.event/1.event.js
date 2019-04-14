/*
    *事件
    *订阅发布
*/
function Person(name){
    this.name = name;
    this._events = {};
}

//注册监听
Person.prototype.on = function(eventName,callback){
    console.log(eventName,callback)
    if(this._events[eventName]){//有人已经订阅过了
        this._events[eventName].push(callback)
    }
    else{
        this._events[eventName] = [callback]
    }
}

Person.prototype.emit = function(eventName){
    //把第一个参数去掉，遍历剩余数组
    var args = Array.prototype.slice.call(arguments,1)
    var callbacks = this._events[eventName];
    var self = this;
    callbacks.forEach(function(callback){
        callback.apply(self,args)
        console.log(self == callback)
    })
}

var girl = new Person();
girl.on("长发及腰",function(){
    console.log("我来娶你可好")
})

girl.on("长发及腰",function(){
    console.log("记得了")
})

girl.emit("长发及腰");





