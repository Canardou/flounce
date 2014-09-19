/*global game,Phaser*/
var levelState = {
    create: function() {
        // Initialize physics
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 300;
        // Collision group
        
    }
};