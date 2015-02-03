
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {
        this.add.sprite(0,0,'background1');

        // add settings button
        this.settingsButton = this.add.button(64, 360, 'settingsButton', this.goSettings, this);

        // add sInstructions button
        this.sInstructionsButton = this.add.button(488, 360, 'instructionsButton', this.goSInstructions, this);

        // add mInstructions button
        this.mInstructionsButton = this.add.button(388, 360, 'instructionsButton', this.goMInstructions, this);


        // add play button
        this.playButton = this.add.button(170, 225, 'playButton', this.goPlay, this);
	},

	update: function () {

	},

	goSettings: function (pointer) {
		// Go to settings screen
		this.state.start('Settings');

	},

	goSInstructions: function (pointer) {
		// Go to instructions
		this.state.states['sInstructions'].fromMainMenu = true;
		this.state.start('sInstructions');

	},

	goMInstructions: function (pointer) {
	// Go to instructions
		this.state.states['mInstructions'].fromMainMenu = true;
		this.state.start('mInstructions');
	},

	goPlay: function (pointer) {
		// Go to selection screen
		this.state.start('Selection');

	}

};
