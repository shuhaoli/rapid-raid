var screenHeight = 444;
var screenWidth = 512;

BasicGame.Sscore = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Sscore.prototype = {

	create: function () {
		this.background = this.add.sprite(0, 0, 'sscoreBackground');
		this.replayButton = this.add.button((screenWidth - 170)/2 , 345, 'replayButton', this.replayGame, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	replayGame: function (pointer) {
		this.state.start('SplayerGame');
	}

};
