/*global Monster,game,pi,cos,sin,def,isDef,rand,inh from utils.js*/
/**
 * Show the credits
 * Should have an exit button
 */
var creditState = {
    preload: function() {},

    create: function() {

        var text = [
            ['A game made by...'],
            ['Olivier Hachette\n       &&\n Simon Robain'],
            ['     For TDDD23\nat Linköping University'],
            ['     Additional credits \n          icons8.com'],
            ['        Thanks\n  for kidnapping me !!\n#StockhlomSyndrome']
        ];

        var exit = function() {
            for (var i in thingToDestroy) {
                thingToDestroy[i].destroy();
            }
            game.state.start('menu');
        }

        var nextText = function() {
                creditText.setText(text.shift());
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
                    if (text.length > 0)
                        nextText();
                    else
                        exit();
                }, this);
            }
            //Handling all the sprite/text to destroy at the end of this state
        var thingToDestroy = [];

        //Flounce a flipper that bounce
        var flipperText = game.add.text(game.world.centerX, 100, 'Flounce, a flipper which ', {
            font: '50px Indie Flower',
            fill: '#ffffff'
        });
        flipperText.anchor.setTo(0.5, 0.5);
        thingToDestroy.push(flipperText);

        var bounce = game.add.text(game.world.centerX, 140, 'bounces!', {
            font: '50px Indie Flower',
            fill: '#ffffff'
        });
        bounce.anchor.setTo(0.5, 0.5);
        thingToDestroy.push(bounce);

        bounce.tween = game.add.tween(bounce).to({
            y: 150
        }, 400, Phaser.Easing.Linear.None, false, 0, 5, true);
        bounce.tween.start();

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
        var creditText = game.add.text(infobox.x + 200, infobox.y + 100, '', {
            font: '40px Indie Flower',
            fill: '#ffffff'
        });
        creditText.anchor.setTo(0.5, 0.5);
        creditText.alpha = 0;
        thingToDestroy.push(creditText);

        var key_esc = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        key_esc.onDown.add(function() {
            exit();
        });

        nextText();
    },
    update: function() {}
};
