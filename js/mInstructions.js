
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
        var ypos = scorebarHeight + gameHeight
        var xpos = gameWidth - buttonWidth;

         if (!this.fromMainMenu) {
        	this.startButton = this.add.button(xpos, ypos, 'smallButton', this.goPlay, this);
        	this.startButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Start", styleSmall);
        	this.startButtonText.anchor.setTo(0, 0.35);
    	} else {
        	this.backButton = this.add.button(xpos, ypos, 'smallButton', this.goBack, this);
        	this.backButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Back", styleSmall);
        	this.backButtonText.anchor.setTo(0, 0.35);
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
