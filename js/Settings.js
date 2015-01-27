
BasicGame.Settings = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Settings.prototype = {

	create: function () {
        // add back button
        this.backButton = this.add.button(170, 225, 'backButton', this.goBack, this);
	},

	update: function () {

	},

	startGame: function (pointer) {

	},

	goBack: function (pointer) {
		// go home
		this.state.start('MainMenu');
	}

};
