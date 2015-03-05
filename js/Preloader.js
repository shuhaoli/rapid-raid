
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		// this.load.image('titlepage', 'assets/title.png');
		// this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		// this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		// this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		
		this.load.image('settingsButton', 'assets/settingsButton.png');
		this.load.image('background1', 'assets/background1.png');
		this.load.image('background2', 'assets/background2.png');
		this.load.image('backgroundGame', 'assets/background3.png');	
		this.load.image('crate', 'assets/darkcrate-32.png');	
		this.load.image('turretL', 'assets/turretL.png');	
		this.load.image('turretR', 'assets/turretR.png');	
		this.load.image('pausePanel', 'assets/pausePanel2.png')	
		this.load.image('sInstructionsButton', 'assets/sInstructionsButton.png');
		this.load.image('mInstructionsButton', 'assets/mInstructionsButton.png');
		this.load.image('sInstructionBackground', 'assets/sInstructionBackgroundExample.png');
		this.load.image('mInstructionBackground', 'assets/mInstructionBackgroundExample.png');
		this.load.image('darkcrate-32', 'assets/darkcrate-32.png');
		this.load.image('medcrate-24', 'assets/medcrate-24.png');
		this.load.image('lightcrate-16', 'assets/lightcrate-16.png');
		this.load.image('selectionBackground', 'assets/background2.png');
		this.load.image('selectionButton', 'assets/selectionButton2.png');
		this.load.image('smallButton', 'assets/smallButton.png');
		this.load.image('medButton', 'assets/medButton.png');
		this.load.image('hp', 'assets/hpbar.png');
		this.load.image('player', 'assets/playerIcon1.png');
		this.load.spritesheet('spriteL', 'assets/spriteSheet.png', 20, 20, 4);
		this.load.spritesheet('spriteR', 'assets/spriteSheet.png', 20, 20, 4);
		this.load.image('bullet', 'assets/bullet2.png');
		this.load.image('bomb', 'assets/bomb.png');
		this.load.image('gold', 'assets/gold.png');
		this.load.image('cash', 'assets/cash.png');
		this.load.image('spike', 'assets/spike.png');
		this.load.image('health', 'assets/health.png');
		this.load.image('health-full', 'assets/health-full.png');

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.

		// start main menu at beginning of game
		this.state.start('MainMenu');
	}

};
