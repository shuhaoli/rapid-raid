
BasicGame.Instructions = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Instructions.prototype = {

	create: function () {

        // add back button
        this.backButton = this.add.button(170, 225, 'backButton', this.goBack, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

	},

	goBack: function (pointer) {
		// go home
		this.state.start('MainMenu');
	}

};
