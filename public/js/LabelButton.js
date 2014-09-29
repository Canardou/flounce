// En attendant que tu designes les boutons un par un avec leur propre texte sur 'toshop on pourra leur mettre un chtit text.
// Du coup si tu peux juste faire un joli cadre de bouton en mode bois bien design (style paddle stylé)
// Ca servira pour les menus et next waves.
// PS pense a le faire bien gros pour pouvoir le resize dans différent truc
var LabelButton = function(game, x, y, key, label, callback,
                       callbackContext, labelColor, overFrame, outFrame, downFrame, upFrame){
    Phaser.Button.call(this, game, x, y, key, callback,
        callbackContext, overFrame, outFrame, downFrame, upFrame);

    var imageCache = game.cache.getImage(key);
    var color = def(labelColor, '#ff6600');

    this.style = {
        'font': 'bold '+imageCache.width+'% Arial',
        'fill': color
    };
    this.anchor.setTo(0.5, 0.5);
    this.label = new Phaser.Text(game, 0, 0, label, this.style);

    //puts the label in the center of the button
    this.label.anchor.setTo( 0.5, 0.5 );

    this.addChild(this.label);
    this.setLabel(label);

    //adds button to game
    game.add.existing(this);
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function(label) {
   this.label.setText(label);
};