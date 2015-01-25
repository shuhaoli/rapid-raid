var gameHeight = 384;
var gameWidth = 512;
var scorebarHeight = 50;
var menubarHeight = 30;

BasicGame.SplayerGame = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.SplayerGame.prototype = {

    create: function () {
        // add background image
        this.add.sprite(0,0,'background');
        
        // add menu buttons
        var buttonSide = 24;
        var ypos = scorebarHeight + gameHeight + (menubarHeight - buttonSide)/2;
        var xpos = gameWidth - buttonSide - (menubarHeight - buttonSide)/2;

        // add quit button
        this.quitButton = this.add.button(xpos, ypos, 'quitButton', this.quitGame, this);        
        xpos -= buttonSide + (menubarHeight - buttonSide)/2;

        // add pause button
        this.pauseButton = this.add.button(xpos, ypos, 'pauseButton', this.pauseGame, this);

        // add resume button and set to invisible
        this.resumeButton = this.add.button(xpos, ypos, 'resumeButton', this.pauseGame, this);
        this.resumeButton.visible = false;
        xpos -= buttonSide + (menubarHeight - buttonSide)/2;


        this.restartButton = this.add.button(xpos, ypos, 'restartButton', this.restartGame, this);

        // add pause panel
        this.pausePanel = new PausePanel(this.game);
        this.add.existing(this.pausePanel);

        // add turrets with appropriate placement
        tbspacing = 15;
        btwspacing = 14;
        turretSize = 32;

        for (var i = 0; i < 16; i++) {
            if (i < 8) {
                this.add.sprite(0,scorebarHeight + i*(turretSize + btwspacing) + tbspacing,'turret');
            }
            else {
                this.turret = this.add.sprite(gameWidth - turretSize, scorebarHeight + (i - 8)*(turretSize + btwspacing) + tbspacing, 'turret');
            }
        }  
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        if (!this.paused) 
            this.turret.reset(Math.random()*gameWidth, Math.random()*gameHeight);
    },

    restartGame: function() {
        this.state.start('SplayerGame');
    },

    pauseGame: function () {
        if (!this.paused) {
            this.paused = true;
            // show pause panel
            this.pausePanel.show();
            // replace pause button with resume button
            this.pauseButton.visible = false;
            this.resumeButton.visible = true;
        }
        else {
            this.paused = false;
            // hide pause panel
            this.pausePanel.hide();
            // replace resume butotn with pause button
            this.resumeButton.visible = false;
            this.pauseButton.visible = true;
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
