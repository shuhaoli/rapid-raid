
BasicGame.sInstructions = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.sInstructions.prototype = {

	create: function () {
		this.add.sprite(0,0,'sInstructionBackground');

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
		
	},

	startGame: function (pointer) {

	},

	goPlay: function(pointer){
		sInstructions = false;
		this.state.start('SplayerGame');
	},

	goBack: function (pointer) {
		this.state.start('MainMenu');
		this.fromMainMenu = false;
	}

};