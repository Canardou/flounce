var upgradeExample = function() {
    var hand = game.add.sprite(game.global.width / 2, game.global.height * 2 / 3, 'hand');
    hand.alpha = 0;
    var randomTower;
    if (game.global.towers.length > 1) {
        randomTower = game.global.towers[Math.floor(Math.random() * (game.global.towers.length - 1) + 1)]

        hand.tween = game.add.tween(hand).to({
            x: randomTower.entity.x - 20,
            y: randomTower.entity.y - 10,
            alpha: 1
        }, 3000, Phaser.Easing.Exponential.Out, true, 0, false).onComplete.add(function() {
            if(game.global.currentLevel.phase=="constructing")
                randomTower.statsTower();
            hand.bringToTop();
            hand.tween = game.add.tween(hand).to({
                x: randomTower.entity.x - 40,
                y: randomTower.entity.y
            }, 2000, Phaser.Easing.Sinusoidal.InOut, true).onComplete.add(function() {
                hand.tween = game.add.tween(hand).to({
                    x: randomTower.entity.x,
                    y: randomTower.entity.y,
                    alpha: 0
                }, 2000, Phaser.Easing.Linear.None, true).onComplete.add(function() {
                    hand.destroy();
                    randomTower.HideDescriptTower();
                    randomTower.hideUpgradeEffect();
                    randomTower.hideMoneyback();
                    randomTower.hideButtons(true);
                })
            });
        }, hand);
    }
}
