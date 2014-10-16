/*
 * set a deal logic in function obj before | after | around
 * @Author MichaelZero
 */

//Aop throw errors
InvalidAspect = new Error("Can't find valid aspect, Aspect is not a function.");

InvalidObject = new Error("Can't find valid object or an array of valid objects");

InvalidMethod = new Error("Can't find valid method to apply aspect on.");

/**
 * do beforeFun before fun
 * @param beforeFun
 * @param fun
 * @return this
 */
 function doBefore(beforeFun , fun){
 	return function(){
 		var args = beforeFun.apply(this , arguments);

 		return fun.apply(this , [args]);
 	}
 }

/**
 * do afterFun after fun
 * @param fun
 * @param afterFun
 * @return this
 */
 function doAfter(fun , afterFun){
 	return function(){
 		var args = fun.apply(this , arguments);

 		return afterFun.apply(this , [args]);
 	}
 }

 (function(){
 	var Aspects = function(){}

 	Aspects.prototype = {

	    /**
	     * set a aspect to obj funs(array | string) 
	     * obj prototype function name.
	     * @param aspect do function
	     * @param obj    set aspect fun obj
	     * @param funs   obj function names
	     */
	     before : function(aspect, obj, funs){
	     	if (typeof(aspect) != 'function'){
	     		throw InvalidAspect;
	     	}

	     	var funcs = typeof(funs) != "object" ? new Array(funs) : funs;

	     	var old;
	     	for(var fun in funcs){
	     		old = obj.prototype[funcs[fun]];

	     		if(!old){
	     			throw InvalidMethod;
	     		}

	     		obj.prototype[funcs[fun]] = doBefore(aspect , old);
	     	}
	     },

	    /**
	     * set a aspect to obj funs(array | string) 
	     * obj prototype function name.
	     * @param aspect do function
	     * @param obj    set aspect fun obj
	     * @param funs   obj function names
	     */
	     after : function(aspect, obj, funs) {
	     	if (typeof(aspect) != 'function'){
	     		throw InvalidAspect;
	     	}

	     	var funcs = typeof(funs) != "object" ? new Array(funs) : funs;

	     	var old;
	     	for(var fun in funcs){
	     		old = obj.prototype[funcs[fun]];

	     		if(!old){
	     			throw InvalidMethod;
	     		}

	     		obj.prototype[funcs[fun]] = doAfter(old , aspect);
	     	}
	     },

	    /**
	     * set a aspect to obj funs(array | string) 
	     * obj prototype function name.
	     * @param aspect do function
	     * @param obj    set aspect fun obj
	     * @param funs   obj function names
	     */
	     around : function(aspect, obj, funs){
	     	if (typeof(aspect) != 'function'){
	     		throw InvalidAspect;
	     	}

	     	var funcs = typeof(funs) != "object" ? new Array(funs) : funs;

	     	for(var fun in funcs){
	     		old = obj.prototype[funcs[fun]];

	     		if(!old){
	     			throw InvalidMethod;
	     		}

	     		obj.prototype[funcs[fun]] = aspect(old);
	     	}
	     }
	}

	if(typeof(module) === "undefined"){
		window.Aspects = Aspects;
	}else{
		module.exports = Aspects;
	}
})();
