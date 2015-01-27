
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
        // add settings button
        this.settingsButton = this.add.button(64, 360, 'settingsButton', this.goSettings, this);

        // add instructions button
        this.instructionsButton = this.add.button(448, 360, 'instructionsButton', this.goInstructions, this);

        // add play button
        this.playButton = this.add.button(170, 225, 'playButton', this.goPlay, this);
	},

	update: function () {

	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game');
	},

	goSettings: function (pointer) {
		// Go to settings screen
		this.state.start('Settings');
	},

	goInstructions: function (pointer) {
		// Go to instructions
		this.state.start('Instructions');
	},

	goPlay: function (pointer) {
		// Go to selection screen
		this.state.start('Selection');
	}

};
