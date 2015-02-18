
BasicGame.mInstructions = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.mInstructions.prototype = {

	create: function () {
		this.add.sprite(0,0,'mInstructionBackground');

        // add back button
        var buttonWidth = 60;
        var buttonHeight = 20;

        if (!this.fromMainMenu) {
        	this.startButton = this.add.button(gameWidth - buttonWidth, gameHeight + menubarHeight + scorebarHeight - buttonHeight, 
        		'startButton', this.goPlay, this); 
    	} else {
        	this.backButton = this.add.button(gameWidth - buttonWidth, gameHeight + menubarHeight + scorebarHeight - buttonHeight, 
        		'backButton', this.goBack, this);
        }
    },


	update: function () {

		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {
		
	},

	goPlay: function (pointer) {
		mInstructions = false;
		this.state.start('MplayerGame');
	},

	goBack: function (pointer) {
		this.state.start('MainMenu');
		this.fromMainMenu = false;
	}

};
