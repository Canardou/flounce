/*global Phaser game*/
var endState = {
    create: function() {
        //Handling all the sprite/text to destroy at the end of this state
        var thingToDestroy = [];
        this.best = false;
        this.die = game.global.currentLevel.hero.dead;

        // Your score
        var points = (game.global.currentLevel.hero.points + game.global.currentLevel.hero.life * 100 + game.global.currentLevel.hero.gold);

        //Checking best score
        var data = new GameData();
        if (points > (+data.getCookie('topScore'))) {
            data.setCookie('topScore', points, game.global.EXPDATE);
            this.best = true;
        }

        //First message
        var wonOrDie = game.add.text(110, 40, (this.die) ? 'You die...' : 'You won !!!', {
            font: '50px Indie Flower',
            fill: '#ffffff'
        });
        wonOrDie.anchor.setTo(0.5, 0.5);
        thingToDestroy.push(wonOrDie);

        //Your score + details + infobox
        //infobox
        var infobox = game.add.sprite(120, 80, 'infobox');
        thingToDestroy.push(infobox);
        infobox.scale.y = 3.5;
        infobox.scale.x = 1.2;
        infobox.alpha = 0.9;

        //score
        var score = game.add.text(125, 85, 'Score: ' + points, {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        thingToDestroy.push(score);

        //details
        var details = '- Monsters Score: ' + game.global.currentLevel.hero.points +
            '\n- Life Score: ' + game.global.currentLevel.hero.life + ' x 100 = ' +
            game.global.currentLevel.hero.life * 100 +
            '\n- Gold Remaining: ' + game.global.currentLevel.hero.gold;
        var detailsToDestroy = game.add.text(160, 130, details, {
            font: '25px Indie Flower',
            fill: '#ffffff'
        });
        thingToDestroy.push(detailsToDestroy);

        //Buttons
        var buttons = game.add.group();
        thingToDestroy.push(buttons);

        var restartButton = game.add.sprite(120, 480, 'infobox');
        restartButton.scale.y = 1.5;
        restartButton.scale.x = 1.2;
        restartButton.alpha = 0.9;
        buttons.add(restartButton);
        restartButton.inputEnabled = true;
        restartButton.input.useHandCursor = true;
        restartButton.events.onInputUp.add(function() {
            for (var i in thingToDestroy) {
                thingToDestroy[i].destroy();
            }
            game.state.start('level1');
        }, this);

        var restartText = game.add.text(restartButton.x + ((this.die) ? (+70) : (+50)), restartButton.y + 20, ((this.die) ? 'Try again' : 'Wanna restart ?'), {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        buttons.add(restartText);

        var menuButton = game.add.sprite(120, 350, 'infobox');
        menuButton.scale.y = 1.5;
        menuButton.scale.x = 1.2;
        menuButton.alpha = 0.9;
        buttons.add(menuButton);
        menuButton.inputEnabled = true;
        menuButton.input.useHandCursor = true;
        menuButton.events.onInputUp.add(function() {
            game.state.start('menu');
        }, this);

        var menuText = game.add.text(menuButton.x + 90, menuButton.y + 20, 'Menu', {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        buttons.add(menuText);

        buttons.tween = game.add.tween(buttons).to({
            y: 300
        }, 2000, Phaser.Easing.Linear.None, false);
        buttons.tween.onComplete.add(function() {
            headStats.tween.start();
            waveStatsToDestroy.tween.start();
            waveStatsBox.tween.start();
            more.input.useHandCursor = false;
            more.events.onInputUp.removeAll();
        }, this);

        //More stats ?
        var more = game.add.text(220, 240, 'More stats ?', {
            font: '25px Indie Flower',
            fill: '#7AE60D'
        });
        more.inputEnabled = true;
        more.input.useHandCursor = true;
        more.events.onInputUp.add(function() {
            buttons.tween.start();
        }, this);
        thingToDestroy.push(more);

        //Wave stats
        var waveStatsBox = game.add.sprite(120, 350, 'infobox');
        waveStatsBox.scale.y = 4;
        waveStatsBox.scale.x = 1.2;
        waveStatsBox.alpha = 0;
        waveStatsBox.tween = game.add.tween(waveStatsBox).to({
            alpha: 0.9
        }, 2000, Phaser.Easing.Linear.None, false);
        thingToDestroy.push(waveStatsBox);

        //Group of text waveStats
        var waveStatsGroup = game.add.group();
        thingToDestroy.push(waveStatsGroup);

        //Head of waveStats
        var headStats = game.add.text(125, 355, ' Life lost per wave:', {
            font: '35px Indie Flower',
            fill: '#ffffff'
        });
        headStats.alpha = 0;
        headStats.tween = game.add.tween(headStats).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, false);
        waveStatsGroup.add(headStats);


        var waveStats = '';
        for (var i in game.global.currentLevel.hero.lifeLostPerWave) {
            if (i !== '0') {
                console.log(i);
                if (i % 2 !== 0) {
                    waveStats += 'n°' + ((+i)) + ': ' + game.global.currentLevel.hero.lifeLostPerWave[i];
                } else {
                    waveStats += '            n°' + ((+i)) + ': ' + game.global.currentLevel.hero.lifeLostPerWave[i] + '\n';
                }
            } else {
            }
        }
        var waveStatsToDestroy = game.add.text(160, 400, waveStats, {
            font: '27px Indie Flower',
            fill: '#ffffff'
        });
        waveStatsToDestroy.alpha = 0;
        waveStatsToDestroy.tween = game.add.tween(waveStatsToDestroy).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, false);
        waveStatsGroup.add(waveStatsToDestroy);


        //Reset global variables
        game.global.currentLevel.destroy();
        game.global.currentLevel = null;
        game.global.towers = [];
        game.global.monsters = [];
    },
};
