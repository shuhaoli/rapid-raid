// Create our pause panel extending Phaser.Group
var PausePanel = function(game, parent){
	// Super call to Phaser.Group
	Phaser.Group.call(this, game, parent);

	// Add the panel
	this.panel = this.create(this.game.width/2, this.game.height/4, 'pausePanel');
	this.panel.anchor.setTo(0.5, 0);

	 // add quit button
	 //this.quitButton = this.add.button(0, 0, 'quitButton', game.quitGame, this);        

	 //this.restartButton = this.add.button(20, 0, 'restartButton', this.restartGame, this);


	 // Add play button
	 var buttonHeight = 25;
	 var buttonWidth = 60;
	 var panelHeight = 224;
	 var panelWidth = 352;

	this.quitButton = this.game.add.button(this.game.width/2 + panelWidth/2 - buttonWidth, this.game.height/4 + panelHeight - buttonHeight
		, 'quitButton', function(){
		this.game.state.getCurrentState().quitGame()}
	, this);
	this.add(this.quitButton);

	 // Add play button
	this.restartButton = this.game.add.button(this.game.width/2 - panelWidth/2 + 10, this.game.height/4 + panelHeight - buttonHeight
		,'restartButton', function(){
		game.state.getCurrentState().restartGame()}, this);
	this.add(this.restartButton);

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