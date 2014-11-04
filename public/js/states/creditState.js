/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
/**
 * Show the credits
 * Should have an exit button
 */
var creditState = {
    preload: function() {},

    create: function() {
        //Handling all the sprite/text to destroy at the end of this state
        var thingToDestroy = [];


        //Flounce a flipper that bounce
        var flipperText = game.add.text(game.world.centerX, 100, 'Flounce, a flipper that ', {
            font: '50px Indie Flower',
            fill: '#ffffff'
        });
        flipperText.anchor.setTo(0.5, 0.5);
        thingToDestroy.push(flipperText);

        var bounce = game.add.text(game.world.centerX, 140, 'bounces', {
            font: '50px Indie Flower',
            fill: '#ffffff'
        });
        bounce.anchor.setTo(0.5, 0.5);
        thingToDestroy.push(bounce);

        bounce.tween = game.add.tween(bounce).to({
            y: 150
        }, 400, Phaser.Easing.Bounce.None, true, 0, true);
        bounce.tween.loop();

        //Princess :D
        var bigPrincess = game.add.sprite(100, 550, 'bigPrincess');
        thingToDestroy.push(bigPrincess);

        //InfoBox
        var infobox = game.add.sprite(210, 350, 'infobox');
        thingToDestroy.push(infobox);
        infobox.scale.y = 3.5;
        infobox.scale.x = 1.4;
        infobox.alpha = 0.94

        //The huge message that Tweeeeen Sorry it is 6:00am...
        var creditText = game.add.text(infobox.x + 200, infobox.y + 100, 'A game made by...', {
            font: '40px Indie Flower',
            fill: '#ffffff'
        });
        creditText.anchor.setTo(0.5, 0.5);
        creditText.alpha = 0;
        thingToDestroy.push(creditText);

        creditText.tween = game.add.tween(creditText).to({
            alpha: 1
        }, 4000, Phaser.Easing.Linear.None, true);

        creditText.tween.onComplete.add(function() {
            creditText.tweenBis.start();
        }, this);

        creditText.tweenBis = game.add.tween(creditText).to({
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tweenBis.onComplete.add(function() {
            creditText.setText('Olivier Hachette\n       &&\n Simon Robain');
            creditText.tween2.start();
        }, this);

        creditText.tween2 = game.add.tween(creditText).to({
            alpha: 1
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tween2.onComplete.add(function() {
            creditText.tween2Bis.start();
        }, this);

        creditText.tween2Bis = game.add.tween(creditText).to({
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tween2Bis.onComplete.add(function() {
            creditText.setText('     For TDDD23\nat Linköping University');
            creditText.tween3.start();
        }, this);

        creditText.tween3 = game.add.tween(creditText).to({
            alpha: 1
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tween3.onComplete.add(function() {
            creditText.tween3Bis.start();
        }, this);

        creditText.tween3Bis = game.add.tween(creditText).to({
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, false)

        creditText.tween3Bis.onComplete.add(function() {
            creditText.setText('        Thanks\n  for kidnapping me !!\n#StockhlomSyndrome');
            //creditText.fontSize = 30;
            creditText.tween4.start();
        }, this);

        creditText.tween4 = game.add.tween(creditText).to({
            alpha: 1
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tween4.onComplete.add(function() {
            creditText.tween4Bis.start();
        }, this);

        creditText.tween4Bis = game.add.tween(creditText).to({
            alpha: 0
        }, 4000, Phaser.Easing.Linear.None, false);

        creditText.tween4Bis.onComplete.add(function() {
            game.state.start('menu');
        }, this);;


    },
    update: function() {}
};
