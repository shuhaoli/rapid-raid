

BasicGame.Selection = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Selection.prototype = {

	create: function () {

		var buttonWidthSelection = 220;
		var buttonHeightSelection = 60;

		this.add.sprite(0,0,'selectionBackground');

        // add singleplayer button
        this.sPlayerButton = this.add.button(gameWidth/2, 160, 'selectionButton', this.goSPlayer, this);
        this.sPlayerButton.anchor.setTo(0.5, 0.5);
        this.sPlayerButtonText = this.add.text(gameWidth/2, 160, "Single-Player", styleSelection);
        this.sPlayerButtonText.anchor.setTo(0.5, 0.40);

        // add multiplayer button
        this.mPlayerButton = this.add.button(gameWidth/2, 280, 'selectionButton', this.goMPlayer, this);
        this.mPlayerButton.anchor.setTo(0.5, 0.5);
        this.mPlayerButtonText = this.add.text(gameWidth/2, 280, "MultiPlayer", styleSelection);
        this.mPlayerButtonText.anchor.setTo(0.5, 0.40);

        var buttonWidth = 60;
        var buttonHeight = 20;
        var ypos = scorebarHeight + gameHeight
        var xpos = 0;

        // add back button
        this.backButton = this.add.button(xpos, ypos, 'smallButton', this.goBack, this);
        this.backButtonText = this.add.text(xpos + buttonWidth/6, ypos + buttonHeight/2, "Back", styleSmall);
        this.backButtonText.anchor.setTo(0, 0.35);
	},

	update: function () {
	},

	goSPlayer: function (pointer) {
		// start singleplayer game
		if (sInstructions) {
			this.state.start('sInstructions');
		} else {
			this.state.start('SCrate');
		}
	},

	goMPlayer: function (pointer) {
		// start multiplayer game
		if (mInstructions) {
			this.state.start('mInstructions');
		} else {
			this.state.start('MCrate');
		}
		
	},

	goBack: function (pointer) {
		this.state.start('MainMenu');
	}
};
