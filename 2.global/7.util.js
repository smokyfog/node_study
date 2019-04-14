

var util = require("util");


function parent() {
    this.name = 'parent';
    this.age= 6;
    this.say = function(){
        console.log('hello',this.name)
    }
}

parent.prototype.showName = function(){
    console.log(this.name)
}

function Child (){
    this.name = "Child";
}

//1.  缺点：不能传参  会继承私有属性
// Child.prototype = new parent();

//2. 
// Child.prototype = Object.create(parent.prototype) 
//等于node提供的以下写法
util.inherits(Child,parent);

var child = new Child();
//console.log()
child.showName();
// console.log(child.__proto__.__proto__.__proto__ == Object.prototype) //true

function person(){
    this.name = 'yqzs';
    this.parent = {
        name : 'parent'
    }
}
person.prototype.toString = function(){
    console.log('this is ',this.name)
}

var p = new person();
p.toString()
//1.showHidden  是否显示隐藏属性
//2.depth       对象递归深度
//3.colors      是否显示 颜色

console.log(util.inspect(p,true,2,true))


var arr1 = [1,2]
var arr2 = [3,4]
console.log(arr1.concat(arr2))
console.log(Array.prototype.push.apply(arr1,arr2))
console.log([...arr1,...arr2])

console.log(util.isArray())
console.log(util.isBoolean())
console.log(util.isBuffer())
console.log(util.isDate())
console.log(util.isError())
console.log(util.isNumber())