/*global game,pi,cos,sin,def,isDef,rand from utils.js*/
/**
 * Text which move upward and disapear
 */
var TextGold = function(x,y,quantity) {
	var text="";
	var base = 27;
	var dividend = 25;
	if(quantity>=0){
		text="+"+quantity;
		this.color = "#D4AF37";
	}
	else{
		text=""+quantity;
		base=34;
		dividend = 0.5;
		this.color = "#660000";
	}

	
	this.fontSize = base + floor(quantity/dividend);
	this.hint = game.add.text(x, y, text);
	this.hint.style.fill = this.color;
    this.hint.style.font = this.fontSize+'px Indie Flower';
    this.hint.anchor.setTo(0.5);
    this.hint.tween = game.add.tween(this.hint);
    this.hint.tween.to({y:y-base*2,alpha:0},2500, Phaser.Easing.Linear.None, true, 0).onComplete.add(function() {this.hint.destroy();;}, this);
};