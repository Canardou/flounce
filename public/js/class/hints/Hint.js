/**
 * Create a circle hint / area hint
 * Duration in seconds
 */
var Hint = function(text, duration, x, y, size) {
    this.duration = def(duration, 0);
    if (isDef(x) && isDef(y)) {
        this.x = x;
        this.y = y;
        this.size = def(size, 1);
        this.entity = game.add.sprite(x, y, 'hint');
        this.entity.scale.set(this.size);
        this.entity.anchor.setTo(0.5, 0.5);
        var lifespan = duration * 1000;
        this.entity.bringToTop();
        this.entity.tween = game.add.tween(this.entity);
        this.entity.tween.to({
            angle: 90,
            alpha: 0
        }, lifespan, Phaser.Easing.Linear.None, true);
        this.entity.tween.onComplete.add(function() {
            this.destroy()
        }, this.entity)

        //Better management of size needed
        this.text = game.add.text(x, y - this.size * 150, text);
        this.text.anchor.setTo(0.5);
        this.text.fontSize = 75;
        this.text.fill = 'white';

        this.text.tween = game.add.tween(this.text);
        this.text.tween.to({
            alpha: 0
        }, lifespan/10, Phaser.Easing.Linear.None, true, 0, 10, true);
        this.text.tween.onComplete.add(function() {
            this.destroy()
        }, this.text)
        this.entity.events.onKilled.add(function() {
            this.text.destroy();
        }, this);
    }

};
