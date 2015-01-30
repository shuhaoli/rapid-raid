var gameHeight = 384;
var gameWidth = 512;
var scorebarHeight = 40;
var menubarHeight = 20;

BasicGame.sInstructions = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.sInstructions.prototype = {

	create: function () {
		this.add.sprite(0,0,'instructionBackground');

        // add back button
        var buttonWidth = 60;
        var buttonHeight = 20;

        this.backButton = this.add.button(gameWidth - buttonWidth, gameHeight + menubarHeight + scorebarHeight - buttonHeight, 'backButton', this.goBack, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {

	},

	goBack: function (pointer) {
		this.state.start('MainMenu');
	}

};