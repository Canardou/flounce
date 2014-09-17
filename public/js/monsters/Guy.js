/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Guy = function(life, gold, value, strengh, decay) {
    Monster.call(this, life, gold, value, strengh, decay);
    //Constants and functions
    var physicsEnable = function(part) {
        game.physics.p2.enableBody(part);
    };
    //Guuuuuuuyyyyy !
    var chest = game.add.sprite(100, 100, 'guy_body');
    this.parts.add(chest);
    chest.anchor.setTo(0.5, 0.5);
    game.physics.p2.enableBody(chest,true);
    chest.body.collideWorldBounds = true;
    //chest.body.clearCollision(true, true);
    // chest.body.static=false;
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            var temp = game.add.sprite(6 - j * 12, -10 + i * 20, 'guy_limb');
            this.parts.add(temp);
            game.physics.p2.enableBody(temp);
            //temp.body.clearCollision(true, true);
            this.revolute = game.physics.p2.createRevoluteConstraint(temp, [0, -3], chest, [ 4 - j * 8, - i * 20 + 10]);
            this.revolute.collideConnected = false;
            this.rotation = game.physics.p2.createRotationalSpring(temp, chest,0,5,1);
        }
    }
    
};

inh(Guy, Monster);
