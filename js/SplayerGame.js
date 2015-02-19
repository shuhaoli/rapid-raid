var walls;
var scoreBox;
var hp = [];

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
    // start game in paused state
    create: function () {
        // add background image
        this.add.sprite(0,0,'background3');
        this.initTurrets();
        this.initCrates();
        this.initMap();
        this.initBoudaries();
        this.initScore();
    },

    // initializes the background, buttons and pause panel
    initMap: function() {        
        // add buttons
        var buttonWidth = 60;
        var buttonHeight = 20;
        var ypos = scorebarHeight + gameHeight
        var xpos = gameWidth - buttonWidth;

        // add pause button
        this.pauseButton = this.add.button(xpos, ypos, 'smallButton', this.pauseGame, this);
        this.pauseButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Pause", styleSmall);
        this.pauseButtonText.anchor.setTo(0, 0.35);

        // add resume button and set to invisible
        this.playButton = this.add.button(xpos, ypos, 'smallButton', this.pauseGame, this);
        this.playButtonText = this.add.text(xpos + buttonWidth/3, ypos + buttonHeight/2, "Play", styleSmall);
        this.playButtonText.anchor.setTo(0, 0.35);
        this.playButton.visible = false;
        this.playButtonText.visible = false;
        this.paused = false;

        // add pause panel
        this.pausePanel = new PausePanel(this.game);
        this.add.existing(this.pausePanel);
    },

    // initializes turrets
    initTurrets: function() {
        // add turrets with appropriate placement
        var numTurrets = 16;
        var tbspacing = 15;
        var btwspacing = 14;
        var turretSize = 32;


        for (var i = 0; i < numTurrets; i++) {
            if (i < numTurrets/2) {
                this.add.sprite(0,scorebarHeight + i*(turretSize + btwspacing) + tbspacing, 'turretL');
            }
            else {
                this.turret = this.add.sprite(gameWidth - 28, scorebarHeight + (i - numTurrets/2)*(turretSize + btwspacing) + tbspacing, 'turretR');
            }
        }
    },

    // initialize crates
    initCrates: function() {
        crates = this.add.group();
        for (var i = 0; i < aplacedCrates.length; i++) {
            var crateInfo = aplacedCrates[i];
            var currentCrate = crates.create(crateInfo['x'], crateInfo['y'], crateInfo['key']);
            currentCrate.anchor.setTo(0.5, 0.5);
            crates.add(currentCrate);
        }
    },

    initBoudaries: function() {
        walls = this.add.group();

        leftWall = this.add.sprite(0, scorebarHeight);
        this.physics.arcade.enable(leftWall);
        leftWall.enableBody = true;
        leftWall.body.setSize(28, gameHeight, 0, 0);
        walls.add(leftWall);

        rightWall = this.add.sprite(gameWidth - 28, scorebarHeight);
        this.physics.arcade.enable(rightWall);
        rightWall.enableBody = true;
        rightWall.body.setSize(28, gameHeight, 0, 0);
        walls.add(rightWall);

        topWall = this.add.sprite(0, 0);
        this.physics.arcade.enable(topWall);
        topWall.enableBody = true;
        topWall.body.setSize(gameWidth, scorebarHeight + 5, 0, 0);
        walls.add(topWall);

        bottomWall = this.add.sprite(0, scorebarHeight + gameHeight - 5);
        this.physics.arcade.enable(bottomWall);
        bottomWall.enableBody = true;
        bottomWall.body.setSize(gameWidth, menubarHeight + 5, 0, 0);
        walls.add(bottomWall);

    },


    initScore: function() {
        var xpos = 40 + 12*3;
        var ypos = 25;
        var hpSpacing = 12;
        var hpStart = 4;
        var currenthp;


        this.add.sprite(5, 5, 'player');
        scoreBox = this.add.text(86, 5, "0", styleMed);
        scoreBox.anchor.setTo(1, 0);

        for (i = 0; i < hpStart; i++) {
            currenthp = this.add.sprite(xpos - i*hpSpacing, ypos, 'hp');
            hp.push(currenthp);
        }
  
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        //if (!this.paused) 
         //   this.turret.reset(Math.random()*gameWidth, Math.random()*gameHeight);
    },

    restartGame: function() {
        this.resetInfo();
        this.state.start('SCrate');
    },

    // consider adding callback for resuming/pausing game in order to sync animation with actual pausing/resuming
    pauseGame: function () {
        if (!this.paused) {
            this.paused = true;
            // show pause panel
            this.pausePanel.show();
            // replace pause button with resume button
            this.pauseButton.visible = false;
            this.pauseButtonText.visible = false;
            this.playButton.visible = true;
            this.playButtonText.visible = true;
        }
        else {
            this.paused = false;
            // hide pause panel
            this.pausePanel.hide();
            // replace resume butotn with pause button
            this.playButton.visible = false;
            this.playButtonText.visible = false;
            this.pauseButton.visible = true;
            this.pauseButtonText.visible = true;
        }
    },


    quitGame: function (pointer) {
        this.resetInfo();
        this.state.start('MainMenu');
    },

    //true - left false - right
    updateScore: function(number) {
        scoreBox.destroy();
        scoreBox = this.add.text(86, 5, number, styleMed);
        scoreBox.anchor.setTo(1, 0);
    
    },

    //true - left false - right
    updateHp: function() {
        if (hp.length != 0) {
            hp.pop().destroy();
        } else {
            this.gameOver();
        }
    },

    gameOver: function() {
        //!!! STUBBBBB
        this.resetInfo();
    },

    // call when game is ending (either restart/gameover)
    // if any of this info is needed in a future state, remove from here
    resetInfo: function() {
        scoreBox = null;
        hp = [];
        aplacedCrates = [];
    }


};


