// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	this.panel = this.create(this.game.width/2, 10, 'pausePanel');
	this.panel.anchor.setTo(0.5, 0.5);


	// Place it out of bounds
	this.x = 0;
	this.y = -1000;
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.show = function(){
	this.game.add.tween(this).to({y:gameHeight/2}, 500, Phaser.Easing.Bounce.Out, true);
};
PausePanel.prototype.hide = function(){
	this.game.add.tween(this).to({y:-100}, 200, Phaser.Easing.Linear.NONE, true);
};