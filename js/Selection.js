
BasicGame.Selection = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.Selection.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

        // add singleplayer button
        this.sPlayerButton = this.add.button(170, 100, 'sPlayerButton', this.goSPlayer, this);

        // add multiplayer button
        this.mPlayerButton = this.add.button(170, 300, 'mPlayerButton', this.goMPlayer, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	startGame: function (pointer) {
		//	And start the actual game
		this.state.start('Game');

	},

	goSPlayer: function (pointer) {
		// start singleplayer game
		this.state.start('SplayerGame');
	},

	goMPlayer: function (pointer) {
		// start multiplayer game
		this.state.start('MplayerGame');
	}

};
