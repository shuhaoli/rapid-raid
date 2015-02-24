
BasicGame.Mscore = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Mscore.prototype = {

	create: function () {
		var finalScore = "Final Score: ";

		this.background = this.add.sprite(0, 0, 'background1');

		this.scoreTextL = this.add.text(gameWidth/3, scorebarHeight + gameHeight / 3, '', styleSelection);
		this.scoreTextL.anchor.setTo(0.5, 0.5);
		this.scoreTextL.setText(finalScore.concat(this.finalScoreL));

		this.scoreTextR = this.add.text(2*gameWidth/3, scorebarHeight + gameHeight / 3, '', styleSelection);
		this.scoreTextR.anchor.setTo(0.5, 0.5);
		this.scoreTextR.setText(finalScore.concat(this.finalScoreR));

		this.replayButton = this.add.button(gameWidth/3, scorebarHeight + gameHeight *3/4, 'selectionButton', this.replayGame, this);
		this.replayButton.anchor.setTo(0.5, 0.5);
        this.replayButtonText = this.add.text(gameWidth/3, scorebarHeight + gameHeight *3/4, "Replay", styleSelection);
        this.replayButtonText.anchor.setTo(0.5, 0.5);

        this.homeButton = this.add.button(2*gameWidth/3, scorebarHeight + gameHeight *3/4, 'selectionButton', this.home, this);
		this.homeButton.anchor.setTo(0.5, 0.5);
        this.homeButtonText = this.add.text(2*gameWidth/3, scorebarHeight + gameHeight *3/4, "Home", styleSelection);
        this.homeButtonText.anchor.setTo(0.5, 0.5);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	replayGame: function (pointer) {
		this.state.start('MCrate');
	},

	home: function (pointer) {
		this.state.start('MainMenu');
	}

};
