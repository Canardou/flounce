/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Rubick = function(x, y, life, gold, value, strength, decay, damage, hero, vx, vy) {
    Monster.call(this, life, gold, value, strength, decay, damage, hero);

    this.lifeMax=life;
    //Guuuuuuuyyyyy !
    var chest = game.add.sprite(x, y, 'rubick', Math.floor(Math.random()*2));
    this.parts.push(chest);
    chest.scale.set(0.3);
    game.physics.p2.enableBody(chest);
    chest.body.setRectangle(30,30);
    //chest.body.clearShapes();
    //chest.body.loadPolygon('paddle_physics', 'rubick');
    this.body=chest.body;
    this.body.mass = 25;
    this.body.velocity.x=def(vx,Math.random()*200-100);
    this.body.velocity.y=-def(vy,Math.random()*100);
    chest.entity=this;
    game.global.depth[1].add(chest);
    
    this.updateCollision();
};

inh(Rubick, Monster);

Rubick.prototype.getHit = function(damage) {
    if (!this.dead) {
        this.life -= damage;
        if(this.life>10)
            this.parts[0].loadTexture('rubick',Math.floor(Math.floor(Math.random()*2)+((this.lifeMax-this.life)/this.lifeMax*8)));
        else
            this.parts[0].loadTexture('rubick',9);
        if (this.life <= 0) {
            this.dead = true;
            this.life = 0;
            this.die();
        }
    }
};