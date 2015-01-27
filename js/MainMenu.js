
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.add.sprite(0, 0, 'titlepage');

        // add settings button
        this.settingsButton = this.add.button(64, 360, 'settingsButton', this.goSettings, this);

        // add instructions button
        this.instructionsButton = this.add.button(448, 360, 'instructionsButton', this.goInstructions, this);

        // add play button
        this.instructionsButton = this.add.button(256, 136, 'playButton', this.goPlay, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

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
