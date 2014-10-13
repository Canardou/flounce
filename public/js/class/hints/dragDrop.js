var dragExample = function() {
    var hand = game.add.sprite(game.global.width / 2, game.global.height * 2 / 3, 'hand');
    hand.alpha = 0;
    hand.tween = game.add.tween(hand).to({
        x: 50,
        y: 990,
        alpha: 1
    }, 3000, Phaser.Easing.Exponential.Out, true, 0, false).onComplete.add(function() {
        var tower = game.add.sprite(hand.x + 20, hand.y + 10, 'bumper0', 0);
        tower.scale.set(0.5);
        tower.anchor.set(0.5);
        tower.tween = game.add.tween(tower).to({
            x: 450,
            y: 450
        }, 4000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function() {
            tower.tween = game.add.tween(tower).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
                tower.destroy()
            });
        });
        hand.bringToTop();
        hand.tween = game.add.tween(hand).to({
            x: 430,
            y: 440
        }, 4000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function() {
            hand.tween = game.add.tween(hand).to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
                hand.destroy()
            })
        });
    }, hand);
}
