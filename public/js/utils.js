var pi = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var floor = Math.floor;
var ceil = Math.ceil;
var inh=function(dst, src, crush){
	for(var e in src.prototype){
		if(!(e in dst.prototype)||crush)
			dst.prototype[e]=src.prototype[e];
	}
};
var isDef=function(arg){
	return (typeof arg!=='undefined')?true:false;
};
var def=function(arg,def){
	return isDef(arg)?arg:def;
};
var rand=function(max,min){
	max=def(max,1);
	min=def(min,0);
	return Math.random()*(max-min)+min;
};