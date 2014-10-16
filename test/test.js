var Aspects = require("../lib/node-aspects.js");

var aspect = new Aspects();

var Obj = function(){}

Obj.prototype.fun0 = function(value){
	return value;
}

Obj.prototype.fun1 = function(key , value){
	return [key , value];
}

//test before aop
aspect.before(function(value){
	value = "[before]"+value;
	return value;
}, Obj, ["fun0", "fun1"]);

var obj0 = new Obj();
console.log(obj0.fun0("Test0"));

console.log(obj0.fun1("key0", "value0"));


//test after aop
var Obj1 = function(){}

Obj1.prototype.fun0 = function(value){
	return value;
}

aspect.after(function(value){
	value = value+"[after]";
	return value;
}, Obj1, ["fun0"]);

var obj1 = new Obj1();
console.log(obj1.fun0("Test0"));


//test around aop
var Obj2 = function(){}

Obj2.prototype.fun0 = function(value){
	console.log(value);
}

aspect.around(function(fun){
	return function(){
		//this set a deal before fun do
		console.log("do before");
		fun(arguments[0]);
		console.log("do after");
	}
}, Obj2, "fun0");

new Obj2().fun0("around");