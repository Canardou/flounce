//* Three size will be available :
//
//
//*//
var Hint = function(text, duration, x, y, size) {
    //Draw an information bubble on the screen for the duration in seconds, 0 for unlimited
    //If x, y are precised, it will draw a circle around the position (size could be specified)
    //If not, it will pop up a text window at the bottom of the screen, with writing animation
    this.duration = def(duration, 0);
    if (isDef(x) && isDef(y)) {
        this.x = x;
        this.y = y;
        this.size = def(size, 1);
        this.entity = game.add.sprite(x, y, 'hint');
        this.entity.scale.set(this.size);
        this.entity.anchor.setTo(0.5,0.5);
        var lifespan = duration * 1000;
        this.entity.bringToTop();
        this.entity.tween = game.add.tween(this.entity);
        this.entity.tween.to({
            angle: 90,
            alpha: 0
        }, lifespan,Phaser.Easing.Linear.None, true);
        this.entity.tween.onComplete.add(function(){this.destroy()},this.entity)
        
        //Better management of size needed
        this.text = game.add.text(x, y - this.size * 150, text);
        this.text.anchor.setTo(0.5);
        this.text.fontSize =75;
        
        this.text.tween = game.add.tween(this.text);
        this.text.tween.to({alpha:0},lifespan,Phaser.Easing.Linear.None,true);
        this.text.tween.onComplete.add(function(){this.destroy()},this.text)
        this.entity.events.onKilled.add(function() {    this.text.destroy();  }, this);
    }

};