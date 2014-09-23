/*global game,Phaser*/
var levelState = {
    create: function() {
        // Initialize physics
        game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y=300;
		game.physics.p2.setImpactEvents(true);
		game.global.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.wallsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.global.limbsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();
		game.physics.p2.world.setGlobalRelaxation=20;
        // Collision group
        
        var paddle=new Paddle({base:50,max:150},250,250,'right');
        
        var spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  spacebar.onDown.add(function() {
      paddle.up();
      //paddle.body.angularVelocity = 100;

  });
    
  spacebar.onUp.add(function() {
         paddle.down();

  });
        
  var monstersToCreate = [
	{"number": 200, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	];

	var wave1 = new Wave(monstersToCreate, 1);
	
	wave1.start();
    }
};