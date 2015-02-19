// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	this.panel = this.create(this.game.width/2, this.game.height/4, 'pausePanel');
	this.panel.anchor.setTo(0.5, 0);

	// Add buttons
	var buttonHeight = 20;
	var buttonWidth = 60;
	var panelHeight = 224;
	var panelWidth = 352;

	var ypos = this.game.height/4 + panelHeight - buttonHeight
	var xposHome = this.game.width/2 + panelWidth/2 - buttonWidth
	var xposRestart = this.game.width/2 - panelWidth/2

	this.homeButton = this.game.add.button(xposHome, ypos, 'smallButton', function(){this.game.state.getCurrentState().quitGame()}, this);
    this.homeButtonText = this.game.add.text(xposHome + buttonWidth/3, ypos + buttonHeight/2, "Home", styleSmall);
    this.homeButtonText.anchor.setTo(0, 0.35);
	this.add(this.homeButton);
	this.add(this.homeButtonText);

	this.restartButton = this.game.add.button(xposRestart, ypos,'smallButton', function(){this.game.state.getCurrentState().restartGame()}, this);
    this.restartButtonText = this.game.add.text(xposRestart + buttonWidth/6, ypos + buttonHeight/2, "Restart", styleSmall);
    this.restartButtonText.anchor.setTo(0, 0.35);
	this.add(this.restartButton);
	this.add(this.restartButtonText);

	// Place it out of bounds
	this.x = 0;
	this.y = -1000;
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.constructor = PausePanel;

PausePanel.prototype.show = function(){
	this.game.add.tween(this).to({y:0}, 500, Phaser.Easing.Bounce.Out, true);
};
PausePanel.prototype.hide = function(){
	this.game.add.tween(this).to({y:-500}, 500, Phaser.Easing.Linear.NONE, true);
};