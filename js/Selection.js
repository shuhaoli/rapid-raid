
BasicGame.Selection = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Selection.prototype = {

	create: function () {

        // add singleplayer button
        this.sPlayerButton = this.add.button(170, 100, 'sPlayerButton', this.goSPlayer, this);

        // add multiplayer button
        this.mPlayerButton = this.add.button(170, 300, 'mPlayerButton', this.goMPlayer, this);
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
