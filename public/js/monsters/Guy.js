/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
var Guy = function(x, y, life, gold, value, strengh, decay) {
    Monster.call(this, life, gold, value, strengh, decay);
    var guyCollision = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    //Constants and functions
    var physicsEnable = function(part) {
        game.physics.p2.enableBody(part);
    };
    //Guuuuuuuyyyyy !
    var chest = game.add.sprite(x, y, 'guy_body');
    this.parts.add(chest);
    game.physics.p2.enableBody(chest, true);
    chest.body.collideWorldBounds = true;
    chest.body.setRectangle(8, 20);
    chest.body.velocity.x=Math.random()*500;
    chest.body.setCollisionGroup(guyCollision);
    //chest.body.static=true;
    //Head
    var head = game.add.sprite(x, y - 13, 'guy_limb');
    this.parts.add(head);
    game.physics.p2.enableBody(head,true);
    head.body.setCircle(5);
    head.revolute = game.physics.p2.createRevoluteConstraint(head, [0, 5], chest, [0, -10]);
    head.revolute.collideConnected = false;
    head.rotation = game.physics.p2.createRotationalSpring(head, chest, 0, 5, 1);
    head.body.setCollisionGroup(guyCollision);
    head.body.collides(game.physics.p2.boundsCollisionGroup);
    //Arms
    var left_arm = game.add.sprite(x - 5, y - 6, 'guy_limb');
    this.parts.add(left_arm);
    game.physics.p2.enableBody(left_arm,true);
    left_arm.body.setRectangle(4, 8);
    left_arm.revolute = game.physics.p2.createRevoluteConstraint(left_arm, [0, -4], chest, [-5, -10]);
    left_arm.revolute.collideConnected = false;
    left_arm.body.setCollisionGroup(guyCollision);
    left_arm.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var left_hand = game.add.sprite(x - 5, y + 2, 'guy_limb');
    this.parts.add(left_hand);
    game.physics.p2.enableBody(left_hand,true);
    left_hand.body.setRectangle(4, 8);
    left_hand.revolute = game.physics.p2.createRevoluteConstraint(left_hand, [0, -4], left_arm, [0, 4]);
    left_hand.revolute.collideConnected = false;
    left_hand.revolute.upperLimitEnabled = true;
    left_hand.revolute.lowerLimitEnabled = true;
    left_hand.revolute.lowerLimit = -1;
    left_hand.revolute.upperLimit = 1;
    left_hand.body.setCollisionGroup(guyCollision);
    left_hand.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var right_arm = game.add.sprite(x + 5, y - 6, 'guy_limb');
    this.parts.add(right_arm);
    game.physics.p2.enableBody(right_arm,true);
    right_arm.body.setRectangle(4, 8);
    right_arm.revolute = game.physics.p2.createRevoluteConstraint(right_arm, [0, -4], chest, [5, -10]);
    right_arm.revolute.collideConnected = false;
    right_arm.body.setCollisionGroup(guyCollision);
    right_arm.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var right_hand = game.add.sprite(x + 5, y + 2, 'guy_limb');
    this.parts.add(right_hand);
    game.physics.p2.enableBody(right_hand,true);
    right_hand.body.setRectangle(4, 8);
    right_hand.revolute = game.physics.p2.createRevoluteConstraint(right_hand, [0, -4], right_arm, [0, 4]);
    right_hand.revolute.collideConnected = false;
    right_hand.revolute.upperLimitEnabled = true;
    right_hand.revolute.lowerLimitEnabled = true;
    right_hand.revolute.lowerLimit = -1;
    right_hand.revolute.upperLimit = 1;
    right_hand.body.setCollisionGroup(guyCollision);
    right_hand.body.collides(game.physics.p2.boundsCollisionGroup);
    //Legs
    var left_leg = game.add.sprite(x - 3, y + 10, 'guy_limb');
    this.parts.add(left_leg);
    game.physics.p2.enableBody(left_leg,true);
    left_leg.body.setRectangle(4, 8);
    left_leg.revolute = game.physics.p2.createRevoluteConstraint(left_leg, [0, -4], chest, [-3, 10]);
    left_leg.revolute.collideConnected = false;
    left_leg.revolute.upperLimitEnabled = true;
    left_leg.revolute.lowerLimitEnabled = true;
    left_leg.revolute.lowerLimit = -1.5;
    left_leg.revolute.upperLimit = 1;
    left_leg.body.setCollisionGroup(guyCollision);
    left_leg.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var left_foot = game.add.sprite(x - 3, y + 18, 'guy_limb');
    this.parts.add(left_foot);
    game.physics.p2.enableBody(left_foot,true);
    left_foot.body.setRectangle(4, 8);
    left_foot.revolute = game.physics.p2.createRevoluteConstraint(left_foot, [0, -4], left_leg, [0, 4]);
    left_foot.revolute.collideConnected = false;
    left_foot.revolute.upperLimitEnabled = true;
    left_foot.revolute.lowerLimitEnabled = true;
    left_foot.revolute.lowerLimit = 0;
    left_foot.revolute.upperLimit = 1;
    left_foot.body.setCollisionGroup(guyCollision);
    left_foot.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var right_leg = game.add.sprite(x + 3, y + 10, 'guy_limb');
    this.parts.add(right_leg);
    game.physics.p2.enableBody(right_leg,true);
    right_leg.body.setRectangle(4, 8);
    right_leg.revolute = game.physics.p2.createRevoluteConstraint(right_leg, [0, -4], chest, [3, 10]);
    right_leg.revolute.collideConnected = false;
    right_leg.revolute.upperLimitEnabled = true;
    right_leg.revolute.lowerLimitEnabled = true;
    right_leg.revolute.lowerLimit = -1;
    right_leg.revolute.upperLimit = 1.5;
    right_leg.body.setCollisionGroup(guyCollision);
    right_leg.body.collides(game.physics.p2.boundsCollisionGroup);
    
    var right_foot = game.add.sprite(x + 3, y + 18, 'guy_limb');
    this.parts.add(right_foot);
    game.physics.p2.enableBody(right_foot,true);
    right_foot.body.setRectangle(4, 8);
    right_foot.revolute = game.physics.p2.createRevoluteConstraint(right_foot, [0, -4], right_leg, [0, 4]);
    right_foot.revolute.collideConnected = false;
    right_foot.revolute.upperLimitEnabled = true;
    right_foot.revolute.lowerLimitEnabled = true;
    right_foot.revolute.lowerLimit = -1;
    right_foot.revolute.upperLimit = 0;
    right_foot.body.setCollisionGroup(guyCollision);
    right_foot.body.collides(game.physics.p2.boundsCollisionGroup);
    
    //game.physics.p2.createDistanceConstraint(world, bodyA, bodyB, distance, localAnchorA, localAnchorB, maxForce)
};

inh(Guy, Monster);
