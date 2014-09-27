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
        this.entity.lifespan = duration * 1000;
        this.entity.bringToTop();
        this.entity.tween = game.add.tween(this.entity);
        this.entity.tween.to({
            angle: 5
        }, 1000);
        this.entity.tween.to({
            angle: -5
        }, 1000);
        this.entity.tween.loop();
        
        //Better management of size needed
        this.text = game.add.text(x, y - this.size * 150, "P");
        this.text.anchor.setTo(0.5);
        this.text.fontSize=75;
        
        this.entity.tween.start();
    }

}