var pi = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var floor = Math.floor;
var ceil = Math.ceil;
Function.prototype.inherits = function(parent) {
	this.prototype = Object.create(parent.prototype);
}
var inh = function(dst, src, crush) {
	for (var e in src.prototype) {
		if (!(e in dst.prototype) || crush)
			dst.prototype[e] = src.prototype[e];
	}
};
var isDef = function(arg) {
	return (typeof arg !== 'undefined') ? true : false;
};
var def = function(arg, def) {
	return isDef(arg) ? arg : def;
};
var rand = function(max, min) {
	max = def(max, 1);
	min = def(min, 0);
	return Math.random() * (max - min) + min;
};
Array.prototype.sum = function(index) {
	var sum=0;
	for (var i = 0; i <= index; i++) {
		sum += this[i]; //Iterate over your first array and then grab the second element add the values up
	}
	return sum;
};