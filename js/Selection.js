

BasicGame.Selection = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Selection.prototype = {

	create: function () {

		var buttonWidth = 220;
		var buttonHeight = 60;

		this.add.sprite(0,0,'selectionBackground');

        // add singleplayer button
        this.sPlayerButton = this.add.button(gameWidth/2, 160, 'selectionButton', this.goSPlayer, this);
        this.sPlayerButton.anchor.setTo(0.5, 0.5);
        this.sPlayerButtonText = this.add.text(gameWidth/2, 160, "Single-Player", styleSelection);
        this.sPlayerButtonText.anchor.setTo(0.5, 0.5);

        // add multiplayer button
        this.mPlayerButton = this.add.button(gameWidth/2, 280, 'selectionButton', this.goMPlayer, this);
        this.mPlayerButton.anchor.setTo(0.5, 0.5);
        this.mPlayerButtonText = this.add.text(gameWidth/2, 280, "MultiPlayer", styleSelection);
        this.mPlayerButtonText.anchor.setTo(0.5, 0.5);
	},

	update: function () {
	},

	goSPlayer: function (pointer) {
		// start singleplayer game
		if (sInstructions) {
			this.state.start('sInstructions');
		} else {
			this.state.start('SplayerGame');
		}
	},

	goMPlayer: function (pointer) {
		// start multiplayer game
		if (mInstructions) {
			this.state.start('mInstructions');
		} else {
			this.state.start('MplayerGame');
		}
		
	}


};
