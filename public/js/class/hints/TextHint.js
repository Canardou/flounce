/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
var TextHint = function(text, x, y, color, fontSize, duration) {
	this.color = def(color,"#1FDA9A");
	this.duration = def(duration, 5);
	this.fontSize = def(fontSize, 30);
	this.hint = game.add.text(x, y, text);
	this.hint.style.fill = this.color;//"#FFA200"; //#1FDA9A
        this.hint.anchor.setTo(0.5);
        this.hint.fontSize = this.fontSize;
        this.hint.lifespan = this.duration * 1000;
        this.hint.tween = game.add.tween(this.hint.scale);
        this.hint.tween.to({x:0.9, y:0.9},800, null, true, 0, 10, true).onComplete.add(function() {this.hint.destroy();}, this);
        //this.hint.tween.start();
        //this.entity.events.onKilled.add(function() {    this.text.destroy();  }, this);
};

       /* this.hint.style = {
                'font': this.fontSize+'px Indie Flower',
                'fill': this.color
        };*/