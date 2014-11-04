/**
 * Lboot of the game state
 */
var bootState = {
    preload: function() {
        // Load the image
        game.load.image('progressBar', 'asset/sprites/loading.png');
    },

    create: function() {
        //Screen size management
        game.scale.maxHeight = document.body.scrollHeight < 1138 ? document.body.scrollHeight : 1138;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize(true);
        game.stage.smoothed = false;
        // Set some game settings 
        game.stage.backgroundColor = '#3498db';

        // Start the load state
        game.state.start('load');
    }
};
